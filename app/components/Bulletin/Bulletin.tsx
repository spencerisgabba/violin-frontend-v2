"use client";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/app/interfaces/interfaces";
import { useEffect, useState } from "react"; // Add useEffect and useState
const data = await fetch(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/feature/featured`,
);
const featured = await data.json();
const Bulletin: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <div className="bulletin">
        {featured?.data.map((item: BlogPost) => (
          <div
            key={item.id}
            className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5 blog"
          >
            <div className="img hidden lg:visible lg:block">
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
        ))}
      </div>
    </div>
  );
};

export default Bulletin;
