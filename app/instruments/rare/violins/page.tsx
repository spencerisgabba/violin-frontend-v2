"use client";

import InstrumentList from "@/app/components/InstrumentPageContent/InstrumentList";
import "../css/Products.scss";
import "../../../global.scss";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import Image from "next/image";

export default function Page() {
  return (
    <div className={"bg-gray-800"}>
      <div className={"flex flex-col text-gray-200"}>
        <Breadcrumbs className={"ml-6"}>
          <BreadcrumbItem href={"/"}>Home</BreadcrumbItem>
          <BreadcrumbItem href={"/instruments"}>Instruments</BreadcrumbItem>
          <BreadcrumbItem href={"/instruments"}>Rare</BreadcrumbItem>
          <BreadcrumbItem
            className={"text-gray-100"}
            href={`/instruments/rare/violins`}
          >
            <p className={"text-gray-100"}>Violins</p>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className={"flex flex-col md:flex-row"}>
          <div
            className={"flex flex-col  pl-2 mt-2 md:mt-10 md:w-1/2 md:px-10"}
          >
            <div>
              <h1 className={"title md:text-center"}>Rare Violins</h1>
            </div>
            <div>
              <p className={"subHeading"}>
                Explore our distinguished collection of violins and violas,
                showcasing the rich heritage and masterful craftsmanship of
                renowned makers from across centuries. Each instrument tells a
                story of artistry and tradition, featuring works from luminaries
                such as Gio. Paolo Maggini of 17th-century Brescia, J. Baptista
                Ceruti of Cremona, and Marinus Capicchioni of 20th-century
                Arimini.
              </p>
            </div>
          </div>
          <div className={"relative w-full h-80 mt-2 md:w-1/2"}>
            <Image
              fill
              objectFit={"cover"}
              src={
                "https://res.cloudinary.com/dztnyrx5z/image/upload/v1733187974/1_dwjye2.jpg"
              }
              alt={"Rare Violin"}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row products">
        <InstrumentList category="violins" />
      </div>
    </div>
  );
}
