"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import "./Products.scss";
import { useFuzzySearchList } from "@nozbe/microfuzz/react";

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
  const [violins, setViolins] = useState<Violin[]>([]);
  const [filteredViolins, setFilteredViolins] = useState<Violin[]>([]);
  const { data, error } = useSWR<Violin[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product`,
    fetcher,
  );
  const [sortOption, setSortOption] = useState<
    "priceLowToHigh" | "priceHighToLow"
  >("priceLowToHigh");
  const [category, setCategory] = useState<string>("All");
  const categories = ["All", "Violin", "Viola", "Cello", "Bass"];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const makers = useRef(new Set<string>()).current;
  // const [uniqueMakers, setUniqueMakers] = useState<string[]>([]);
  // const [selectedMaker, setSelectedMaker] = useState<string>("");
  const [queryText, setQueryText] = useState("");

  const filteredList = useFuzzySearchList({
    list: filteredViolins,
    queryText,
    getText: (item) => [
      item.makerFirst,
      item.makerLast,
      item.makeYear,
      item.category,
    ],
    mapResultItem: ({ item }) => item,
  });

  useEffect(() => {
    let filtered = filteredViolins;

    if (category && category !== "All") {
      filtered = violins.filter(
        (violin) => violin.category.toLowerCase() === category.toLowerCase(),
      );
    } else {
      filtered = violins;
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
      data.forEach((item) =>
        makers.add(item.makerFirst + " " + item.makerLast),
      );
      // setUniqueMakers(Array.from(makers));
    }
  }, [data, makers, filteredViolins]);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  const handleSortChange = (option: "priceLowToHigh" | "priceHighToLow") => {
    setSortOption(option);
    setSortDropdownOpen(false);
  };

  // const MakerDropdown = ({ makers }: { makers: string[] }) => {
  //
  //     const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //         const selectedMaker = event.target.value;
  //         if (selectedMaker) {
  //             setSelectedMaker(selectedMaker);
  //         }
  //     };
  //
  //     return (
  //         <select onChange={handleSelect} defaultValue="">
  //             <option value="" disabled>Select a Maker</option>
  //             {uniqueMakers.map((maker, index) => (
  //                 <option key={index} value={maker}>
  //                     <Link href={`/products/${maker}`}>{maker}</Link>
  //                 </option>
  //             ))}
  //         </select>
  //     );
  // };
  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col h-screen products">
      <div className="bg-amber-500 sm:mx-10 glass">
        <div className="flex flex-row flex-wrap mt-3 topbar p-3">
          <form className="">
            <div className="relative mx-6 drop-shadow">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="white"
                    stroke-linecap="round"
                    fill={"white"}
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-200   rounded-lg bg-gray-500  dark:placeholder-gray-400  "
                placeholder="Search Products"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
              />
            </div>
          </form>

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
            {filteredList.length > 0 ? (
              <motion.div
                key={filteredViolins.length}
                className="flex flex-row flex-wrap productcontainers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredList.map((violin) => {
                  const imagesArray = violin.images
                    .split(",")
                    .map((url) => url.trim());
                  return (
                    <Link
                      key={violin.id}
                      href={`/products/${violin.makerLast}/${violin.makeYear}`}
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
                            height={350}
                            src={imagesArray[0] || "/images/blurredImage.webp"}
                            alt="Product"
                            className="rounded-lg h-60 w-40"
                          />
                        </div>
                        <h2 className={"text-white"}>
                          {violin.makerFirst} {violin.makerLast}
                        </h2>
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
