"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import './blogPage.scss';
import useSWR from "swr";
import { useParams } from 'next/navigation';
import Image from "next/image";
import DOMPurify from "dompurify";
type BlogPost = {
    id: string;
    slug: string;
    title: string;
    subheading: string;
    image_url: string;
    content: string; // Assuming you have content or body field for the post
    createdAt: string;
};

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    });

const BlogPostPage = () => {
    const params = useParams<{ slug: string }>();
    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

    const { data, error } = useSWR<BlogPost>(
        params!.slug ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/slug/${params!.slug}` : null,
        fetcher
    );

    useEffect(() => {
        if (data) {
            setBlogPost(data);


        }
    }, [data]);

    if (error) return <div>Error loading blog post.</div>;
    if (!blogPost) return <div>Loading...</div>;

    const rawHTML = blogPost.content;
    return (
        <div>
            <Link href={'/blog'} className={'inline-block w-10 h-10 m-7'}>
                <Image  width={50} height={50} src={"/icons/returnIcon.svg"} alt={"back arrow"} />
            </Link>
            <div className='p-10'>
                <h1 className='text-4xl font-bold'>{blogPost.title}</h1>
                <p className='text-sm text-gray-500'>
                    {new Date(blogPost.createdAt).toLocaleDateString()}
                </p>
                <Image src={blogPost.image_url || "/images/blurredImage.webp"} loading={"lazy"} alt={blogPost.title} width={1920} height={1080} className='w-1/2 h-auto mt-5 rounded-lg' />
                <h2 className='mt-5 text-2xl '>{blogPost.subheading}</h2>
                <div  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} className='mt-5 innerHTML'>

                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;
