"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import "./Products.scss";
import "../global.scss";
import { useFuzzySearchList } from "@nozbe/microfuzz/react";
import { Slider } from "@nextui-org/slider";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

type Violin = {
  id: string;
  images: string; // Comma-separated image URLs
  title: string;
  price: number;
  category: string;
  description: string;
  createdAt: {
    value: string;
  };
  maker: string;
  makeYear: string;
  makerFirst: string;
  makerLast: string;
};

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear();
const MIN_PRICE = 0;
const MAX_PRICE = 200000;

export default function Page() {
  const [violins, setViolins] = useState<Violin[]>([]);
  const [filteredViolins, setFilteredViolins] = useState<Violin[]>([]);
  const { data, error } = useSWR<Violin[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product`,
    fetcher,
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = ["Violin", "Viola", "Cello", "Bass"];
  const [queryText, setQueryText] = useState("");
  const [yearRange, setYearRange] = useState([MIN_YEAR, MAX_YEAR]);
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false); // State for mobile filters visibility

  const getCategoryCounts = () => {
    const counts: { [key: string]: number } = {};
    violins.forEach((violin) => {
      counts[violin.category] = (counts[violin.category] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

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

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category); // Remove if already selected
      } else {
        return [...prev, category]; // Add if not selected
      }
    });
  };

  useEffect(() => {
    let filtered = violins;

    if (selectedCategories.length > 0) {
      filtered = violins.filter((violin) =>
        selectedCategories.includes(violin.category),
      );
    }

    setFilteredViolins(filtered);
  }, [selectedCategories, violins]);

  useEffect(() => {
    if (data) {
      setViolins(data);
      setFilteredViolins(data);
    }
  }, [data]);

  useEffect(() => {
    const filtered = violins.filter((violin) => {
      const year = parseInt(violin.makeYear);
      const price = violin.price;
      return (
        year >= yearRange[0] &&
        year <= yearRange[1] &&
        price >= priceRange[0] &&
        price <= priceRange[1]
      );
    });
    setFilteredViolins(filtered);
  }, [yearRange, priceRange, violins]);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-row products">
      <div
        className={`bg-amber-100 min-w-80 hidden md:block rounded-lg  text-amber-50 px-5 ml-5 `}
      >
        <Accordion variant={"light"} defaultExpandedKeys={["1"]}>
          <AccordionItem key="1" aria-label="Instrument" title="Instrument">
            <ul className="p-3 space-y-1 text-sm text-gray-700">
              {categories.map((cat) => (
                <li key={cat}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.toLowerCase())}
                    onChange={() => handleCategoryChange(cat.toLowerCase())}
                    value={cat}
                  />
                  <label className={"text-black"}>
                    {cat} ({categoryCounts[cat.toLowerCase()] || 0})
                  </label>
                </li>
              ))}
            </ul>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Year" title="Year">
            <h2 className={"text-black"}>
              Year Range: {yearRange[0]} - {yearRange[1]}
            </h2>
            <Slider
              label="Year Range"
              step={1}
              minValue={MIN_YEAR}
              maxValue={MAX_YEAR}
              defaultValue={[MIN_YEAR, MAX_YEAR]}
              value={yearRange}
              onChange={(value: number | number[]) => {
                if (Array.isArray(value)) {
                  setYearRange(value);
                }
              }}
              className="max-w-md"
            />
          </AccordionItem>
          <AccordionItem key="3" aria-label="Price" title="Price">
            <h2 className={"text-black"}>
              Price Range: {USDollar.format(priceRange[0])} -{" "}
              {USDollar.format(priceRange[1])}
            </h2>
            <Slider
              label="Price Range"
              step={100}
              minValue={MIN_PRICE}
              maxValue={MAX_PRICE}
              defaultValue={[MIN_PRICE, MAX_PRICE]}
              value={priceRange}
              onChange={(value: number | number[]) => {
                if (Array.isArray(value)) {
                  setPriceRange(value);
                }
              }}
              className="max-w-md"
            />
          </AccordionItem>
        </Accordion>
      </div>

      <div className={"-mt-10 "}>
        <div className="flex align-middle items-center justify-center md:justify-between md:align-baseline">
          <form className="ml-5 w-3/4 h-10 mt-5 md:mt-0 flex items-center">
            <div className="inset-y-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="white"
                  strokeLinecap="round"
                  fill={"transparent"}
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block pl-1 w-full p-2 ps-10 border-b-4 text-xl text-white bg-transparent focus:outline-none border-0 underline-offset-4"
              placeholder="Search Instruments"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
            />
          </form>
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="open-button  align-middle justify-center items-center md:hidden flex ml-2 h-6"
          >
            {"Filters"}
            <motion.div
              animate={{ rotate: isMobileFiltersOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={"/icons/chevron-down-outline.svg"}
                alt={"down icon"}
                width={20}
                height={20}
              />
            </motion.div>
          </button>
        </div>

        <div
          className={
            "flex align-middle w-full justify-center md:block md:align-baseline "
          }
        >
          <div className="bg-amber-500 min-w-11/12 md:3/4 sm:mx-10 md:mx-3 glass min-h-screen flex align-middle md:block">
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
                                height={350}
                                src={
                                  imagesArray[0] || "/images/blurredImage.webp"
                                }
                                alt="Product"
                                className="rounded-lg h-60 w-40"
                              />
                            </div>
                            <h2 className={""}>
                              {violin.makerFirst} {violin.makerLast}
                            </h2>
                            <div
                              className={
                                "flex bg-amber-200 rounded bg-opacity-50 w-fit px-2"
                              }
                            >
                              <p
                                className={"text-gray-600 w-fit category mr-1 "}
                              >
                                {violin.category.charAt(0).toUpperCase() +
                                  violin.category.slice(1)}{" "}
                                • {violin.makeYear}
                              </p>
                            </div>
                            <p className="text-lg text-gray-400">
                              {USDollar.format(violin.price)}
                            </p>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </motion.div>
                ) : (
                  <div className={"w-11/12"}>
                    <h1>
                      Your keywords and filters don&apos;t match any products.
                    </h1>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-filters"></div>

      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            className="mobile-filters-panel"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="close-button"
              >
                Close
              </button>
              <h2>Filters</h2>
              <div>
                <h3>Categories</h3>
                <ul className="p-3 space-y-1 text-sm text-gray-700">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.toLowerCase())}
                        onChange={() => handleCategoryChange(cat.toLowerCase())}
                        value={cat}
                      />
                      <label className={"text-black"}>
                        {cat} ({categoryCounts[cat.toLowerCase()] || 0})
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Year Range</h3>
                <Slider
                  label="Year Range"
                  step={1}
                  minValue={MIN_YEAR}
                  maxValue={MAX_YEAR}
                  defaultValue={[MIN_YEAR, MAX_YEAR]}
                  value={yearRange}
                  onChange={(value: number | number[]) => {
                    if (Array.isArray(value)) {
                      setYearRange(value);
                    }
                  }}
                  className="max-w-md"
                />
              </div>
              <div>
                <h3>Price Range</h3>
                <Slider
                  label="Price Range"
                  step={100}
                  minValue={MIN_PRICE}
                  maxValue={MAX_PRICE}
                  defaultValue={[MIN_PRICE, MAX_PRICE]}
                  value={priceRange}
                  onChange={(value: number | number[]) => {
                    if (Array.isArray(value)) {
                      setPriceRange(value);
                    }
                  }}
                  className="max-w-md"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
