"use client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useFuzzySearchList } from "@nozbe/microfuzz/react";

interface Bow {
  id: string;
  name: string;
  Type: string;
  Price: number;
}

function Filter({ categories, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange(e.target.value);
  };

  // Map category codes to display names
  const categoryNames = {
    VA: "Viola",
    VC: "Cello",
    VN: "Violin",
  };

  return (
    <ul className="items-center ml-2 w-32 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li className="w-32  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
          <input
            id="all-categories"
            type="radio"
            name="category"
            value=""
            checked={selectedCategory === ""}
            onChange={handleCategoryChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            htmlFor="all-categories"
            className="w-32 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            All
          </label>
        </div>
      </li>
      {categories.map((category) => (
        <li
          key={category}
          className="w-32 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
        >
          <div className="flex items-center ps-3">
            <input
              id={category}
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={handleCategoryChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor={category}
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {categoryNames[category] || category}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}

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

export default function Page() {
  const [queryText, setQueryText] = useState("");
  const [bows, setBows] = useState<Bow[]>([]);
  const [filteredBows, setFilteredBows] = useState<Bow[]>([]);
  const { data, error } = useSWR<Bow[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bows`,
    fetcher,
  );
  const filteredList = useFuzzySearchList({
    list: filteredBows,
    queryText,
    getText: (item) => [item.name, item.Type],
    mapResultItem: ({ item }) => item,
  });

  const categories = ["VA", "VC", "VN"];
  const handleFilterChange = (category) => {
    if (category === "") {
      setFilteredBows(bows);
    } else {
      const filtered = bows.filter((bow) => bow.Type === category);
      setFilteredBows(filtered);
    }
  };

  useEffect(() => {
    if (data) {
      setBows(data);
      setFilteredBows(data);
    }
  }, [data]);
  if (error) return <div>Error loading Bow details.</div>;

  return (
    <div>
      <div className={"flex"}>
        <div className="relative ml-2 drop-shadow w-48">
          <div className="absolute inset-y-0 start-0 h-9 flex items-center ps-3 pointer-events-none align-middle">
            <svg
              className="w-4 h-4 text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              fillOpacity={0}
              viewBox="0 0 20 20"
            >
              <path
                stroke="white"
                strokeLinecap="round"
                fill={"white"}
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 ps-10 text-sm text-gray-50  rounded-lg bg-gray-500  dark:placeholder-gray-400  "
            placeholder="Search Bows"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
          />
        </div>
        <Filter categories={categories} onFilterChange={handleFilterChange} />
      </div>
      <div className="shadow-sm overflow-hidden my-8">
        <table className="table-auto border-collapse w-full text-sm">
          <thead>
            <tr>
              <th
                className={
                  "border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                }
              >
                <div className={"flex"}>
                  <h1
                    className={
                      "  font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left mt-2"
                    }
                  >
                    Bows
                  </h1>
                </div>
              </th>
              <th
                className={
                  "border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                }
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody className={"bg-white dark:bg-slate-800"}>
            {filteredList.map((bow) => (
              <tr key={bow.id}>
                <td
                  className={
                    "border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
                  }
                >
                  {bow.name}
                </td>

                <td
                  className={
                    "border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
                  }
                >
                  {USDollar.format(bow.Price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
