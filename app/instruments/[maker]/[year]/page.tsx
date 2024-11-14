"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import './productPage.scss';
import ZoomImage from "@/app/components/ZoomImage/ZoomImage";
import useSWR from "swr";
import { useParams } from 'next/navigation';
import Image from "next/image";

type Violin = {
    image: string;
    title: string;
    price: number;
    maker: string;
    makeYear: string;
    makerFirst: string;
    makerLast: string;
    category: string;
    description: string;
    images:string;
    createdAt: {
        value:string;
    }
};


const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    });
export default function Page(): JSX.Element {
    const params = useParams<{ maker: string; year: string }>();
    const [violin, setViolin] = useState<Violin | null>(null);
    const { maker, year } = params;

    const { data, error } = useSWR<Violin[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${maker}-${year}`, fetcher);

    useEffect(() => {
        if (data) {
            setViolin(data[0]);
        }
    }, [data]);

    if (error) return <div>Error loading violin details.</div>;
    if (!violin) return <div>Loading...</div>;

    return (
        <div className={"bg-amber-50"}>
            <Link href={'/products'} className={'inline-block w-10 h-10 m-7'}>
                <div>
                    <Image width={50} height={50} src={"/icons/returnIcon.svg"} alt={"back arrow"} />
                </div>
            </Link>
            <div className='md:p-10 p-0 sm:grid sm:grid-cols-2 place-content-stretch h-auto flex flex-col'>
                <div className='flex md:justify-end justify-center zoom-container relative'>
                    <ZoomImage
                        imageUrls={violin.images}
                        alt={violin.title}
                    />
                </div>
                <div className='md:ml-10 ml-2 '>
                    <div className={"flex flex-col"}>
                        <h1
                        className='text-3xl font-bold text-amber-300 opacity-40 '>{violin.makerFirst}</h1>
                        <h1 className='text-5xl font-bold'>{violin.makerLast}</h1></div>

                    {violin.price ? (
                        <p className='text-2xl'>${violin.price}</p>
                    ) : (
                        <></>
                    )}
                    <p className={"bg-amber-200 category"}>{violin.category.charAt(0).toUpperCase() + violin.category.slice(1)}</p>
                    <p className='pt-5'>{violin.description}</p>
                </div>
            </div>
        </div>
    );
}