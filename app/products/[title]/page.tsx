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
    category: string;
    description: string;
    createdAt: string | null;
    value: string;
    imageBack: string;
};

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    });

export default function Page(): JSX.Element {
    const params = useParams<{ title: string }>();
    const [violin, setViolin] = useState<Violin | null>(null);
    const title = params.title;
    const { data, error } = useSWR<Violin[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/title/${title}`, fetcher);

    useEffect(() => {
        if (data) {
            setViolin(data[0]);
            console.log(data);
        }
    }, [data]);

    if (error) return <div>Error loading violin details.</div>;
    if (!violin) return <div>Loading...</div>;

    const mainSrc = violin.image === "null" ? "/images/blurredImage.webp" : violin.image;
    const thumbnailSrc = violin.imageBack === "null" ? "/images/blurredImage.webp" : violin.imageBack;

    return (
        <div className={"bg-amber-50"}>
            <Link href={'/products'} className={'inline-block w-10 h-10 m-7'}>
                <div>
                    <Image width={50} height={50} src={"/icons/returnIcon.svg"} alt={"back arrow"} />
                </div>
            </Link>
            <div className='p-10 sm:grid sm:grid-cols-2 place-content-stretch h-auto flex flex-col'>
                <div className='flex justify-end zoom-container relative'>
                    <ZoomImage
                        imageUrls={violin.images}
                        alt={violin.title}
                    />
                </div>
                <div className='ml-10 '>
                    <h1 className='text-5xl font-bold '>{violin.title}</h1>
                    {violin.price ? (
                        <p className='text-2xl'>${violin.price}</p>
                    ) : (
                        <></>
                    )}
                    <p className={"bg-amber-200 category"}>{violin.category.charAt(0).toUpperCase() + violin.category.slice(1)}</p>
                    <p className='pt-5'>{violin.description}</p>
                    {violin.createdAt ? (
                        <p>{new Date(violin.createdAt.value).toLocaleDateString()}</p>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}