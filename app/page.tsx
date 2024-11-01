'use client'

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

import "./home.scss";
import {useEffect, useState} from "react";
import Skeleton from "@/app/components/Skeleton/Skeleton";
import VideoComponent from "@/app/components/VideoComponent";

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
      <div className="main">

        <div className="home">
            <div className="homeimg">
            <VideoComponent />
            </div>
          <div className="text">
            <h1>Violins für Alles</h1>
          </div>
        </div>

        <div className="maincontent">
          <h1 className="bully">Bulletin</h1>
          <div className="bulletin">
            {feature.length > 0 ? (
                feature.map((item) => (
                    <div key={item.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5 blog">
                      <Image
                          className="img w-30 collapse md:visible"
                          src={item.image_url}
                          width={200}
                          height={200}
                          alt="Blog"
                      />
                      <div className="md:pl-16">
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
};

