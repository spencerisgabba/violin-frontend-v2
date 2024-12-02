"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import "./productCard.scss";
import { ProductCardProps } from "@/app/interfaces/interfaces";

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const imagesArray = product.images.split(",").map((url) => url.trim());
  const productLink =
    product.category.toLowerCase() === "viola"
      ? `/instruments/rare/violas/${product.makerLast}/${product.makeYear}`
      : `/instruments/rare/violins/${product.makerLast}/${product.makeYear}`;
  if (!isMounted) {
    return <div>Loading...</div>; // Render a loading state instead of null
  }
  return (
    <Link
      key={product.id}
      href={productLink}
      className="product"
      draggable={false}
    >
      <motion.div
        transition={{ duration: 0.3 }}
        animate={{
          opacity: 1,
          y: -10,
          x: 0,
          position: "relative",
        }}
        initial={{ opacity: 0, y: 10 }}
        exit={{ opacity: 0 }}
        className="flex flex-col wi   p-3 lg:p-2"
      >
        <div className={"w-52"}>
          <div className="image-container">
            <Image
              fill
              objectFit="cover"
              quality={80}
              className={"pointer-events-none w-full h-full absolute"}
              draggable={false}
              src={imagesArray[0] || "/images/blurredImage.webp"}
              alt="Product"
            />
          </div>
        </div>
        <h2 className={"w-fit"}>
          {product.makerFirst} {product.makerLast}
        </h2>
        <div className={"flex bg-amber-200 rounded bg-opacity-50 w-fit px-1"}>
          {product.location !== null &&
          product.location.toLowerCase() !== "null" ? (
            <p className={"text-gray-600 w-fit text-sm  category mr-1 "}>
              {product.location.charAt(0).toUpperCase() +
                product.location.slice(1)}
            </p>
          ) : (
            <div></div>
          )}
          <p className={"text-gray-600 text-sm w-fit category mr-1 "}>
            {product.makeYear}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
