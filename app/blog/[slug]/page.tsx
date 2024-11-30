"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./blogPage.scss";
import useSWR from "swr";
import { useParams } from "next/navigation";
import Image from "next/image";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns";
import {BlogPost} from "@/app/interfaces/interfaces";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

const BlogPostPage = () => {
  const params = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

  const { data, error } = useSWR<BlogPost[]>(
    params!.slug
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/slug/${params!.slug}`
      : null,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      setBlogPost(data[0]);
    }
  }, [data]);

  if (error) return <div>Error loading blog post.</div>;
  if (!blogPost) return <div>Loading...</div>;

  const rawHTML = blogPost.content;
  return (
    <div className={"bg-amber-100 "}>
      <Link href={"/blog"} className={"inline-block w-10 h-10 m-4"}>
        <Image
          width={50}
          height={50}
          src={"/icons/returnIcon.svg"}
          alt={"back arrow"}
        />
      </Link>
      <div className={"flex flex-col align-middle justify-center blogCont "}>
        <div className="lg:p-10 flex flex-col align-middle items-center p-4 lg:w-1/2 ">
          <div className={"info items-baseline"}>
            <h1 className="lg:text-5xl text-3xl  max-w-1/2 font-extrabold">
              {blogPost.title}
            </h1>
            <h2 className="text-xl lg:text-2xl">{blogPost.subheading}</h2>
            <h4 className="text-lg lg:text-xl text-gray-500">
              By {blogPost.author} •{" "}
              {formatDistanceToNow(new Date(blogPost.createdAt.value), {
                addSuffix: true,
              })}
            </h4>
          </div>
          <Image
            src={blogPost.image_url || "/images/blurredImage.webp"}
            loading={"lazy"}
            alt={blogPost.title}
            width={1920}
            height={1080}
            className="w-full h-auto mt-7 rounded-lg"
          />
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }}
            className="mt-5 innerHTML"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
