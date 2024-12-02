"use client";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import "./Blog.scss";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { Spinner } from "@nextui-org/spinner";
import PaginationComponent from "@/app/components/paginationComponent/paginationComponent";
import { BlogPost } from "@/app/interfaces/interfaces";
import { useBlogPosts } from "../components/useData/useData";
export default function BlogPage() {
  const [pageState, setPageState] = useState({
    page: 1,
    perPage: 10,
  });

  const handlePageChange = (newPage: number) => {
    setPageState({ page: newPage, perPage: pageState.perPage });
  };

  const { posts, pagination, isLoading, isError, total } = useBlogPosts(
    pageState.page,
    "",
  );
  useEffect(() => {
    if (posts) {
      setPageState({ page: pagination.page, perPage: pagination.page });
    }
  }, [posts, pagination]);
  const [itemCount] = useState(total || 0);

  if (isError) return <div>Error loading blog details.</div>;
  return (
    <div className=" flex flex-col justify-center items-center w-full ">
      <div className={"flex flex-col text-gray-200 w-screen "}>
        <Breadcrumbs className={"ml-4 mt-4"}>
          <BreadcrumbItem href={"/"}>Home</BreadcrumbItem>
          <BreadcrumbItem className={"text-gray-100"}>
            <p className={"text-gray-100"}>Blog</p>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className={"flex flex-col md:flex-row mt-10"}>
          <div
            className={"flex flex-col  pl-2 mt-2 md:mt-10 md:w-1/2 md:px-10"}
          >
            <div className={"fbi z-1 bottom-64 content mt-4"}>
              <Image
                width={400}
                height={400}
                src={"/icons/FiddleBow.svg"}
                alt="Fiddle and Bow Icon"
              />
            </div>
            <div>
              <p className={"subHeading pt-2"}>
                The Blog page for the Violin Guild of America
              </p>
            </div>
          </div>
          <div className={"relative  h-96 mt-10 md:mt-4 w-full"}>
            <Image
              fill
              objectFit={"cover"}
              src={
                "https://images.pexels.com/photos/306175/pexels-photo-306175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt={"Rare Violin"}
            />
          </div>
        </div>
      </div>
      <div className={"topbar "}></div>
      <div className="fullblg md:grid xl:gap-56 md:grid-cols-2 xl:grid-cols-3 bloger blogs pb-8">
        {isLoading ? (
          <Spinner
            label="Loading..."
            color="warning"
            className={"ml-5 mt-10 text-white"}
          />
        ) : (
          posts.map((blog: BlogPost) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className={"articleWrapper"}
            >
              <article
                className="article p-6 mx-3  bg-white rounded-lg h-96 shadow-2xl"
                style={{ backgroundImage: `url(${blog.image_url})` }}
              >
                <div className="flex items-center mb-5 text-gray-100">
                  <span className="text-sm">
                    {formatDistanceToNow(new Date(blog.createdAt.value), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <h1 className="title mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {blog.title}
                </h1>
                <p className="mb-5 font-light text-gray-200">
                  {blog.subheading}
                </p>
              </article>
            </Link>
          ))
        )}
      </div>
      <div className={"bg-dablue p-2 w-full px-10"}>
        <PaginationComponent
          pagination={pageState}
          totalItems={itemCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
