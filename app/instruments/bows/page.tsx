"use client";
import useSWR from "swr";
import { useEffect, useState } from "react";

interface Bow {
  id: string;
  name: string;
  Type: string;
  Price: number;
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
  const [bows, setBows] = useState<Bow[]>([]);
  const { data, error } = useSWR<Bow[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bows`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      setBows(data);
    }
  }, [data]);
  console.log(data);

  return (
    <div>
      <div className="shadow-sm overflow-hidden my-8">
        <table className="table-auto border-collapse w-full text-sm">
          <thead>
            <tr>
              <th
                className={
                  "border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                }
              >
                Bows
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
            {bows.map((bow) => (
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
