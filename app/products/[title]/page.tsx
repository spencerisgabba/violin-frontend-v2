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
    createdAt: string; // Use Date if you receive a Date object directly
};


const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    });

const Page = () => {
    const params = useParams<{ title: string }>();
    const [violin, setViolin] = useState<Violin | null>(null);

    const { data, error } = useSWR<Violin>(
        params!.title ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/title/${params!.title}` : null,
        fetcher
    );

    useEffect(() => {
        if (data) {
            setViolin(data);
        }
    }, [data]);

    if (error) return <div>Error loading violin details.</div>;
    if (!violin) return <div>Loading...</div>;

    return (
        <div>
            <Link href={'/products'} className={'inline-block w-10 h-10 m-7'}>
                <div >
                <Image width={50} height={50} src={"/icons/returnIcon.svg"} alt={"back arrow"} />
                </div>
            </Link>
            <div className='p-10 sm:grid sm:grid-cols-2 place-content-stretch h-auto flex flex-col'>
                <div className='flex justify-end zoom-container relative' >
                    <ZoomImage src={violin.image || "/images/blurredImage.webp"} alt="Zoomable Image" />
                </div>
                <div className='ml-10 mt-10'>
                    <h1 className='text-4xl font-bold'>{violin.title}</h1>
                    <p className='text-2xl'>${violin.price}</p>
                    <p>{violin.category}</p>
                    <p className='pt-5'>{violin.description}</p>
                    <p>{new Date(violin.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Page;