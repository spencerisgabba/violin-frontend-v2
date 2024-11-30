import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import "./productCard.scss";
import { ProductCardProps } from "@/app/interfaces/interfaces";
import { motion } from "framer-motion";
import { Skeleton } from "@nextui-org/skeleton";
const ProductCard: FC<ProductCardProps> = ({ product, loaded }) => {
  const shortDescription =
    product.description.toLowerCase() !== "null" &&
    product.description.toLowerCase() !== "undefined"
      ? product.description.split(" ").slice(0, 10).join(" ") + "..."
      : ""; // Default message if description is null
  const imagesArray = product.images.split(",").map((url) => url.trim());
  const productLink =
    product.category.toLowerCase() === "viola"
      ? `/instruments/rare/violas/${product.makerLast}/${product.makeYear}`
      : `/instruments/rare/violins/${product.makerLast}/${product.makeYear}`;
  return (
    <Link
      href={productLink}
      key={product.id}
      className="product "
      draggable={false}
    >
      <div className={"w-full h-0.5 overflow-hidden  br"}></div>

      <div className={"flex flex-col bg w-screen h-80 p-1 md:p-5"}>
        <div className={"filters"}>
          <div className="flex flex-row md:flex-row items-center flex-nowrap md:justify-around ml-2 border-t-amber-900">
            {/* Maker Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
              className="flex flex-col col-span-2 md:order-1 md:mr-4 w-full shrink  self-end lg:self-auto"
            >
              <Skeleton isLoaded={!loaded} className={"rounded-xl"}>
                <h2 className="prodtitle">
                  {product.makerFirst} {product.makerLast}
                </h2>
                <p className="description mt-2">{shortDescription}</p>
              </Skeleton>
            </motion.div>

            {/* Image Section */}
            <div className="flex justify-center items-center w-full h-72 relative order-1 md:order-2 basis-1/2 flex-nowrap">
              <Skeleton isLoaded={!loaded} className={"rounded-lg w-full "}>
                <div className="h-72 min-w-32 relative">
                  <Image
                    fill
                    objectFit="cover"
                    quality={80}
                    className="pointer-events-none rounded-lg"
                    draggable={false}
                    src={imagesArray[0] || "/images/blurredImage.webp"}
                    alt={`${product.makerFirst} ${product.makerLast} product`}
                  />
                </div>
              </Skeleton>
              <div
                className={`h-full md:w-full relative ${
                  !loaded ? "visible w-auto" : "w-0 collapse"
                }`}
              >
                <Image
                  fill
                  objectFit="cover"
                  quality={80}
                  className="pointer-events-none"
                  draggable={false}
                  src={imagesArray[1] || "/images/blurredImage.webp"}
                  alt={`${product.makerFirst} ${product.makerLast} product`}
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col items-center md:ml-5 order-3 basis-1/5 self-start absolute">
              <div>
                {product.makeYear.toLowerCase() &&
                  product.makeYear.toLowerCase() !== " " && (
                    <Skeleton isLoaded={!loaded} className={"rounded-lg"}>
                      <div className="flex pill">
                        <p className="p-0.5 px-1 rounded-l-md bg-amber-800 text-amber-200  md:text-sm">
                          Made In
                        </p>
                        <p className="p-0.5 px-1 rounded-r-md text-amber-800 bg-amber-200  md:text-sm">
                          {product.makeYear}
                        </p>
                      </div>
                    </Skeleton>
                  )}

                {product.location &&
                  product.location.toLowerCase() !== "null" && (
                    <Skeleton isLoaded={!loaded} className={"rounded-lg my-2"}>
                      <div className="flex pt-2 pill">
                        <p className="p-0.5 rounded-l-md bg-amber-800 text-amber-200  md:text-sm">
                          City
                        </p>
                        <p className="text-amber-800 bg-amber-200 p-0.5 rounded-r-md w-fit category mr-1  md:text-sm">
                          {product.location.charAt(0).toUpperCase() +
                            product.location.slice(1)}
                        </p>
                      </div>
                    </Skeleton>
                  )}
              </div>

              {/* Icon */}
              <div className="relative mt-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48px"
                  height="48px"
                  viewBox="0 0 48 48"
                  className="w-14 h-14"
                >
                  <g id="surface1">
                    <path d="M 12 12 L 12 15.601562 L 29.855469 15.601562 L 9.601562 35.855469 L 12.144531 38.398438 L 32.398438 18.144531 L 32.398438 36 L 36 36 L 36 12 Z M 12 12 " />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<motion.div*/}
      {/*    transition={{duration: 0.3}}*/}
      {/*    animate={{*/}
      {/*        opacity: 1,*/}
      {/*        y: -10,*/}
      {/*        x: 0,*/}
      {/*        position: "relative",*/}
      {/*    }}*/}
      {/*    initial={{opacity: 0, y: 10}}*/}
      {/*    exit={{opacity: 0}}*/}
      {/*    className="flex flex-col wi p-3 lg:p-2"*/}
      {/*>*/}
      {/*    <div className={"w-52"}>*/}
      {/*        <div className="image-container">*/}
      {/*            <Image*/}
      {/*                layout="fill"*/}
      {/*                fill={true}*/}
      {/*                objectFit='cover'*/}
      {/*                quality={80}*/}
      {/*                className={"pointer-events-none w-full h-full absolute"}*/}
      {/*                draggable={false}*/}
      {/*                src={imageUrl || "/images/blurredImage.webp"}*/}
      {/*                alt={`${makerFirst} ${makerLast} product`}*/}
      {/*            />*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*    <h2 className={"w-fit"}>*/}
      {/*        {makerFirst} {makerLast}*/}
      {/*    </h2>*/}
      {/*    <p>{shortDescription}</p>*/}
      {/*    <div className={"flex bg-amber-200 rounded bg-opacity-50 w-fit px-1"}>*/}
      {/*        {city && city.toLowerCase() !== "null" ? (*/}
      {/*            <p className={"text-gray-600 w-fit text-sm category mr-1 "}>*/}
      {/*                {city.charAt(0).toUpperCase() + city.slice(1)}*/}
      {/*            </p>*/}
      {/*        ) : (<></>)}*/}
      {/*        <p className={"text-gray-600 text-sm w-fit category mr-1 "}>{madeYear}</p>*/}
      {/*    </div>*/}
      {/*</motion.div>*/}
    </Link>
  );
};

export default ProductCard;
