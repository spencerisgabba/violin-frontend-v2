"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import "../Products.scss";
import { useParams } from "next/navigation";

type Violin = {
  id: string;
  images: string; // Comma-separated image URLs
  title: string;
  price: number;
  category: string;
  description: string;
  createdAt: string;
  maker: string;
  makeYear: string;
  makerFirst: string;
  makerLast: string;
};

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

export default function Page() {
  const params = useParams<{ maker: string }>();
  const [violins, setViolins] = useState<Violin[]>([]);
  const { maker } = params;
  const [filteredViolins, setFilteredViolins] = useState<Violin[]>([]);
  const { data, error } = useSWR<Violin[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${maker}`,
    fetcher,
  );
  const [sortOption, setSortOption] = useState<
    "priceLowToHigh" | "priceHighToLow"
  >("priceLowToHigh");
  const [category, setCategory] = useState<string>("All");
  const categories = ["All", "Violin", "Viola", "Cello", "Bass"];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  useEffect(() => {
    let filtered = violins;

    if (category && category !== "All") {
      filtered = violins.filter(
        (violin) => violin.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (sortOption === "priceLowToHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredViolins(filtered);
  }, [category, sortOption, violins]);

  useEffect(() => {
    if (data) {
      setViolins(data);
      setFilteredViolins(data);
    }
  }, [data]);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  const handleSortChange = (option: "priceLowToHigh" | "priceHighToLow") => {
    setSortOption(option);
    setSortDropdownOpen(false);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col h-screen products">
      <div className="bg-amber-500 sm:mx-10 glass">
        <div className="flex flex-row flex-wrap mt-3 topbar p-3">
          <div className="mb-4 mr-4 flex">
            <label htmlFor="sortOptions" className="font-medium text-gray-900">
              Sort by:{" "}
            </label>
            <div className="relative">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="text-white bg-gray-400 hover:bg-gray-800 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 inline-flex items-center"
              >
                {sortOption === "priceLowToHigh"
                  ? "Price: Low to High"
                  : "Price: High to Low"}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {sortDropdownOpen && (
                <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 absolute">
                  <ul className="p-3 space-y-1 text-sm text-gray-700">
                    <li>
                      <button
                        onClick={() => handleSortChange("priceLowToHigh")}
                        className="w-full text-left p-2 rounded hover:bg-gray-100"
                      >
                        Price: Low to High
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleSortChange("priceHighToLow")}
                        className="w-full text-left p-2 rounded hover:bg-gray-100"
                      >
                        Price: High to Low
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap text-md">
            <h1>Category: </h1>
            <div className="relative ml-3">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white bg-gray-400 hover:bg-gray-800 focus:ring-2 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 inline-flex items-center"
              >
                {category || "Select Category"}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 absolute">
                  <ul className="p-3 space-y-1 text-sm text-gray-700">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => handleCategoryChange(cat)}
                          className="w-full text-left p-2 rounded hover:bg-gray-100"
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-row flex-wrap">
          <AnimatePresence mode="wait">
            {filteredViolins.length > 0 ? (
              <motion.div
                key={filteredViolins.length}
                className="flex flex-row flex-wrap productcontainers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }} // Adjust duration for smoother transition
              >
                {filteredViolins.map((violin) => {
                  const imagesArray = violin.images
                    .split(",")
                    .map((url) => url.trim());
                  return (
                    <Link
                      key={violin.id}
                      href={`/instruments/${violin.makerLast}/${violin.makeYear}`}
                      className="product"
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
                        className="flex flex-col max-w-68 p-3 md:p-10"
                      >
                        <div className="image-container">
                          <Image
                            width={150}
                            quality={50}
                            onMouseOver={(e) =>
                              (e.currentTarget.src =
                                imagesArray[1] || "/images/blurredImage.webp")
                            }
                            height={350}
                            src={imagesArray[0] || "/images/blurredImage.webp"}
                            alt="Product"
                            className="rounded-lg h-60 w-40"
                          />
                        </div>
                        <h2 className={"text-white"}>{violin.maker}</h2>
                        <h4 className={"text-gray-500 m-0 p-0"}>
                          {violin.makeYear}
                        </h4>
                        <p className="text-lg text-gray-400">${violin.price}</p>
                      </motion.div>
                    </Link>
                  );
                })}
              </motion.div>
            ) : (
              <div>
                <h1>No products found for this category.</h1>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
