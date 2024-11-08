"use client"
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import Image from "next/image";
import "./Blog.scss";
import useSWR from 'swr';
import Head from "next/head";
interface BlogPost {
    id: string;
    slug: string;
    title: string;
    subheading: string;
    image_url: string;
    status: string;
    createdAt: {
        value: string;
    };
}

const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
});

export default function BlogPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const { data, error } = useSWR<BlogPost[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog`, fetcher);

    useEffect(() => {
        if (data) {
            setBlogs(data);
        }
    }, [data]);

    if (error) return <div>Error loading blog details.</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="pb-8 flex flex-col justify-center items-center w-full">
            <Head>
                <title>Blog</title>
            </Head>
            <div className={"topbar "}>
                <div className={"blogImg"}>
                    <Image fill={true} src="/images/blog_background.webp" alt="Blog Background" objectFit="cover" className="rounded-3xl -mt-56" />
                </div>
                <div className={"fbi z-30 w-96 bottom-64 content"}>
                    <Image width={400} height={400} src={"/icons/FiddleBow.svg"} alt="Fiddle and Bow Icon" />
                </div>
            </div>
            <div className="md:grid xl:gap-56 md:grid-cols-2 xl:grid-cols-3 bloger blogs">

                {blogs
                    .filter((blog) => blog.status === 'published')
                    .map((blog) => (
                        <Link key={blog.id} href={`/blog/${blog.slug}`} className={"articleWrapper"}>
                            <article
                                className="article p-6 mx-3  bg-white rounded-lg h-96 shadow-2xl"
                                style={{ backgroundImage: `url(${blog.image_url})` }}
                            >
                                <div className="flex items-center mb-5 text-gray-100">
                                    <span className="text-sm">
                                        {formatDistanceToNow(new Date(blog.createdAt.value), { addSuffix: true })}
                                    </span>
                                </div>
                                <h1 className="title mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h1>
                                <p className="mb-5 font-light text-gray-200">{blog.subheading}</p>
                            </article>
                        </Link>
                    ))}
            </div>
        </div>
    );
}