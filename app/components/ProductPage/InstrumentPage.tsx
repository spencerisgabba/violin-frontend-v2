"use client";

import { FC, useEffect, useState } from "react";
import ZoomImage from "@/app/components/ZoomImage/ZoomImage";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import "./instrumentPage.scss";
type Instrument = {
  image: string;
  title: string;
  price: number;
  location: string;
  maker: string;
  makeYear: string;
  makerFirst: string;
  makerLast: string;
  category: string;
  description: string;
  images: string;
  createdAt: {
    value: string;
  };
};
type InstrumentPageProps = {
  category: string;
};

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

const InstrumentPage: FC<InstrumentPageProps> = ({ category }) => {
  const params = useParams<{ maker: string; year: string }>();
  const [instrument, setInstrument] = useState<Instrument | null>(null);
  console.log(category);
  const { maker, year } = params;
  const { data, error } = useSWR<Instrument[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${category}/${maker}/${year}`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      setInstrument(data[0]);
    }
  }, [data]);

  if (error) return <div>Error loading instrument details.</div>;
  if (!instrument) return <div>Loading...</div>;

  return (
    <div className={"bg-amber-50"}>
      <div className={"p-5"}>
        <Breadcrumbs className={""}>
          <BreadcrumbItem href={"/"}>Home</BreadcrumbItem>
          <BreadcrumbItem href={"/instruments"}>Instruments</BreadcrumbItem>
          <BreadcrumbItem href={`/instruments/rare/${category}s`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}s
          </BreadcrumbItem>
          <BreadcrumbItem>
            {instrument.makerLast} {instrument.makeYear}
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="md:p-10 p-0 sm:grid sm:grid-cols-2 place-content-stretch h-auto flex flex-col">
        <div className="flex md:justify-end justify-center zoom-container relative">
          <ZoomImage imageUrls={instrument.images} alt={instrument.title} />
        </div>
        <div className="md:ml-10 ml-2 ">
          <div className={"flex flex-col"}>
            <h1 className="text-3xl font-bold text-amber-300 opacity-40 ">
              {instrument.makerFirst}
            </h1>
            <h1 className="text-5xl font-bold">{instrument.makerLast}</h1>
          </div>
          {instrument.description &&
          instrument.description !== "undefined" &&
          instrument.description.toLowerCase() !== "null" ? (
            <p className="pt-5">{instrument.description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default InstrumentPage;
