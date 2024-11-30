import {FilterProps} from "@/app/interfaces/interfaces";
import {useState} from "react";

export default function BowFilter({ categories, onFilterChange }: FilterProps) {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCategory(e.target.value);
        onFilterChange(e.target.value);
    };

    // Map category codes to display names
    const categoryNames: { [key: string]: string } = {
        VA: "Viola",
        VC: "Cello",
        VN: "Violin",
    };

    return (
        <ul className="md:flex-col items-baseline ml-2 w-32  text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className=" border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
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
                        className=" py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        All
                    </label>
                </div>
            </li>
            {categories.map((category) => (
                <li
                    key={category}
                    className=" border-box border-gray-200 sm:border-b-0  dark:border-gray-600"
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