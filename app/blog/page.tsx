"use client"
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import Image from "next/image"
import "./Blog.scss";
import useSWR from 'swr';

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    subheading: string;
    image_url: string;
    status: string;
    createdAt: string;
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
    if (!blogs.length) return <div>Loading...</div>;

    return (
        <div className="bg-yellow-200 pb-8 flex flex-col justify-center items-center w-full">
            <div className={"topbar"}>
                <Image src={"/images/blog_background.png"} alt="Blog Background" width={100} height={100} className="rounded-3xl blogImg" />
                <Image src={"/icons/FiddleBow.svg"} alt="Fiddle and Bow Icon"  width={100} height={100} className="z-30 w-96 bottom-64 ml-10 fbi" />
            </div>

            <div className="grid gap-0 grid-cols-3 lg:px-80 bg-yellow-200 blogs">
                {blogs
                    .filter((blog) => blog.status === 'published')
                    .map((blog) => (
                        <article
                            key={blog.id}
                            className="article p-6 bg-white rounded-lg w-full h-96 shadow-2xl dark:bg-gray-800 dark:border-gray-700"
                            style={{ backgroundImage: `url(${blog.image_url})` }}
                        >
                            <Link href={`/blog/${blog.slug}`}>
                                    <div className="flex items-center mb-5 text-gray-100">
                                        <span className="text-sm">
                                            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {blog.title}
                                    </h2>
                                    <p className="mb-5 font-light text-gray-200">{blog.subheading}</p>
                            </Link>
                        </article>
                    ))}
            </div>
        </div>
    );
}
