'use client'

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import "./home.scss";
import { useEffect, useState, useRef } from "react";
import Skeleton from "@/app/components/Skeleton/Skeleton";
import Head from "next/head";
import { gsap } from "gsap";
type BlogFeature = {
    id: string;
    image_url: string;
    title: string;
    subheading: string;
    slug: string;
};


const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    });

export default function Page() {
    const [feature, setFeature] = useState<BlogFeature[]>([]);
    const { data, error } = useSWR<BlogFeature[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/feature/featured`, fetcher);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const animateText = () => {
            if (titleRef.current) {
                // Fade out the current text
                gsap.to(titleRef.current, {
                    opacity: 0,
                    duration: 1,
                    y: -50,
                    ease: "power3.in",
                    onComplete: () => {
                        // Change the text content
                        if (titleRef.current) {
                            const newText = titleRef.current.textContent === "Strings of Mastery" ? "Elegance in Sound" : "Strings of Mastery";
                            titleRef.current.textContent = newText;

                            // Fade in the new text
                            gsap.fromTo(titleRef.current, {
                                opacity: 0,
                                y: 50,
                            }, {
                                opacity: 1,
                                duration: 1,
                                y: 0,
                                ease: "power3.out",
                            });
                        }
                    }
                });
            }
        };

        // Repeat animation every 5 seconds
        const intervalId = setInterval(animateText, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (data) {
            setFeature(data);
        }
    }, [data]);

    if (error) return <div>Error loading blog details.</div>;
    if (!feature.length) {
        return (
            <div className="main">
                <Skeleton width="100%" height="20%" />
            </div>
        );
    }

    return (
        <div className="main" id="smooth-wrapper">
            <Head>
                <title>Violin Guild of America</title>

            </Head>
            <div className="home" id="smooth-content">
                <div className="homeimg">
                    <video preload="auto" controls={false} playsInline autoPlay muted loop>
                        <source src="https://videos.pexels.com/video-files/5652224/5652224-uhd_3840_2160_24fps.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="text">
                    <h1 ref={titleRef}>Strings of Mastery</h1>
                </div>
            </div>

            <div className="maincontent">
                <h1 className="bully">Bulletin</h1>

                <div className="bulletin">
                    {feature.length > 0 ? (
                        feature.map((item) => (
                            <div key={item.id} className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5 blog">
                                <div className="img  hidden lg:visible lg:block">
                                    <Image
                                        className="object-cover"
                                        src={item.image_url}
                                        fill

                                        alt="Blog"
                                    />
                                </div>
                                <div className="md:pl-4">
                                    <Link href={`/blog/${item.slug}`}>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {item.title}
                                        </h5>
                                    </Link>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {item.subheading}
                                    </p>
                                    <Link
                                        href={`/blog/${item.slug}`}
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Read more
                                        <svg
                                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No featured posts available.</div>
                    )}
                </div>
            </div>

        </div>
    );
}
