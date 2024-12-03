"use client";
import { useEffect, useRef, useState } from "react";
import { BowResponse } from "@/app/interfaces/interfaces";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "@nextui-org/shared-icons";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import Image from "next/image";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import "./bows.scss";
import { useBows } from "@/app/components/useData/useData";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const categories = [
  { value: "", label: "All" }, // Option to show all types
  { value: "VN", label: "Violin" },
  { value: "VC", label: "Cello" },
  { value: "VA", label: "Viola" },
];

export default function Page() {
  const [pagestate, setPageState] = useState({
    page: 1,
    perPage: 10,
  });

  const seeMoreRef = useRef<HTMLInputElement>(null);
  const [searchTerm] = useState(" ");
  const [searchEntry, setSearchEntry] = useState(searchTerm);
  const [filter, setFilter] = useState({
    type: "",
  });

  const debounced = useDebouncedCallback(
    // function
    (searchTerm) => {
      setSearchEntry(searchTerm);
    },
    // delay in ms
    750,
  );
  const { instruments, pageInfo, isLoading } = useBows(
    pagestate.page,
    searchEntry,
    pagestate.perPage,
    filter.type,
  );

  const handleFilterChange = (selectedType: string) => {
    setFilter((prev) => ({ ...prev, type: selectedType }));
  };
  const [hasMore, setHasMore] = useState(pageInfo?.hasNextPage || false);
  const incrementPerPage = () => {
    setPageState((prev) => ({ ...prev, perPage: prev.perPage + 20 }));
  };
  useEffect(() => {
    if (instruments) {
      setHasMore(pageInfo?.hasNextPage || false);
    }
  }, [instruments, pageInfo?.hasNextPage]);
  // const scrollToSection = (ref:<HTMLDivElement>) => {
  //   if (ref.current) {
  //     ref.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  return (
    <div>
      <div className={"flex flex-col text-gray-200"}>
        <Breadcrumbs className={"ml-6"}>
          <BreadcrumbItem href={"/"}>Home</BreadcrumbItem>
          <BreadcrumbItem href={"/instruments"}>Instruments</BreadcrumbItem>
          <BreadcrumbItem
            className={"text-gray-100"}
            href={`/instruments/bows`}
          >
            <p className={"text-gray-100"}>Bows</p>
          </BreadcrumbItem>
        </Breadcrumbs>
        <div className={"flex flex-col md:flex-row"}>
          <div
            className={"flex flex-col  pl-2 mt-2 md:mt-10 md:w-1/2 md:px-10"}
          >
            <div>
              <h1 className={"title md:text-center text-gray-100"}>
                Rare Bows
              </h1>
            </div>
            <div>
              <p className={"subHeading"}>
                We offer a large selection of rare bows, and also represent
                numerous contemporary bow makers. Please contact us for pricing
                or to make an appointment
              </p>
            </div>
          </div>
          <div className={"relative w-full h-80 mt-2 md:w-1/2"}>
            <Image
              fill
              objectFit={"cover"}
              src={
                "https://res.cloudinary.com/dztnyrx5z/image/upload/v1733187977/6_sijzft.jpg"
              }
              alt={"Rare Violin"}
            />
          </div>
        </div>
      </div>
      <div className="shadow-sm overflow-hidden my-8">
        <Table
          aria-label="Bow List Table"
          style={{ color: "white" }}
          bottomContent={
            hasMore && !isLoading ? (
              <div className="flex w-full justify-center">
                <Button
                  isDisabled={isLoading}
                  variant="flat"
                  onPress={incrementPerPage}
                >
                  {isLoading && <Spinner color="white" size="sm" />}
                  Load More
                </Button>
              </div>
            ) : null
          }
        >
          <TableHeader className={"w-full"}>
            <TableColumn className={"flex align-middle items-center"}>
              <span className={"pr-2 pl-0 md:pl-3"}>NAME</span>
              <Input
                label=""
                isClearable
                defaultValue={searchTerm}
                size="sm"
                onChange={(e) => debounced(e.target.value.toLowerCase())}
                radius="lg"
                className={"w-fit"}
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "ark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60 ",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-xl",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",

                    "!cursor-text",
                  ],
                }}
                startContent={
                  <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
                placeholder="Search"
              />
            </TableColumn>
            <TableColumn>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    className="capitalize text-gray-200"
                  >
                    {filter.type || "Type"}{" "}
                    {/* Default text when no category is selected */}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Category selection"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={new Set([filter.type])} // Set the selected key based on the filter
                  onSelectionChange={(selected) => {
                    const selectedValue = Array.from(selected).join(""); // Convert Set to string
                    handleFilterChange(selectedValue);
                  }}
                >
                  {categories.map((category) => (
                    <DropdownItem
                      className="text-gray-300"
                      key={category.value} // Key needs to match value
                    >
                      {category.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </TableColumn>
            <TableColumn>PRICE</TableColumn>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Spinner
                    label="Loading..."
                    color="warning"
                    className="ml-5 mt-10"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <></>
                </TableCell>
                <TableCell className="text-center">
                  <></>
                </TableCell>
              </TableRow>
            ) : instruments ? (
              instruments.map((bow: BowResponse) => (
                <TableRow key={bow.id}>
                  <TableCell>{bow.name}</TableCell>
                  <TableCell>{bow.Type}</TableCell>
                  <TableCell>{USDollar.format(bow.Price)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Your keywords and filters don&#39;t match any products.
                </TableCell>
                <TableCell className="text-center">
                  <></>
                </TableCell>
                <TableCell className="text-center">
                  <></>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div ref={seeMoreRef}></div>
      </div>
    </div>
  );
}
