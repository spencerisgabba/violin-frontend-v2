"use client";

import { useEffect, useState } from "react";
import { Instrument } from "@/app/interfaces/interfaces";
import { useDebouncedCallback } from "use-debounce";
import "./InstrumentList.scss";
import ProductCardTest from "@/app/components/ProductCardTest/ProductCardTest";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useDisclosure } from "@nextui-org/use-disclosure";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useInstrument } from "@/app/components/useData/useData";
import { Spinner } from "@nextui-org/spinner";

const InstrumentList = ({ category }: { category: string }) => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1126px)" });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchEntry, setSearchEntry] = useState(searchTerm);
  const [sortField, setSortField] = useState<string>("makerFirst");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [pagestate, setPageState] = useState({
    page: 1,
    perPage: 10,
  });
  const { instruments, pagination, pageInfo, isLoading, isError, total } =
    useInstrument(pagestate.page, searchEntry, category, sortOrder, sortField);
  useEffect(() => {
    if (instruments) {
      setPageState(pagination || pagestate);
    }
  }, [instruments, pagination, pagestate]);

  const [hasPrev] = useState(pageInfo?.hasPreviousPage || false);
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle sort order if the same field is clicked
      setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    } else {
      // Set new field and default to ascending order
      setSortField(field);
      setSortOrder("ASC");
    }
  };
  const debounced = useDebouncedCallback((searchTerm) => {
    setSearchEntry(searchTerm);
  }, 750);

  const handlePageChange = (newPage: number) => {
    setPageState((prev) => ({ ...prev, page: newPage }));
  };

  if (isError) return <div>Error loading {category} details.</div>;

  return (
    <div className={"w-full"}>
      <div className="flex flex-col products">
        <div className="flex items-center justify-around bg-white w-full px-4 ">
          <h1 className="text-2xl font-thin text-slate-800 collapse md:visible">
            FILTERS
          </h1>

          <div
            className={
              "flex gap-x-5 font-thin flex-wrap justify-center md:justify-around"
            }
          >
            <div className={"flex items-center py-3 "}>
              <h1 className={"text-2xl pr-1"}>SEARCH: </h1>
              <input
                type="text"
                placeholder="Search"
                className="border border-slate-300 p-2 rounded-md bg-gray-200 w-3/4"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  debounced(e.target.value);
                }}
              />
              <Button
                onPress={onOpen}
                className={`bg-transparent ${isOpen ? "rotate-180" : ""}`}
              >
                <Image
                  priority
                  className={" h-8 w-8 md:collapse "}
                  src={"/icons/downblk.svg"}
                  width={20}
                  height={20}
                  alt={"Down arrow"}
                />
              </Button>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement={"bottom"}
              >
                <ModalContent>
                  {(onClose) => (
                    <div className={"text-white"}>
                      <ModalHeader className="flex flex-col gap-1">
                        Filters
                      </ModalHeader>
                      <ModalBody>
                        <div
                          className={
                            "flex gap-x-4 flex-wrap  items-center justify-center"
                          }
                        >
                          <Button
                            className={
                              "flex items-center cursor-pointer px-2 py-1 bg-transparent"
                            }
                            onClick={() => handleSort("makerFirst")}
                          >
                            <h1 className={"text-2xl"}>FIRST </h1>
                            {sortField === "makerFirst" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className={`bi bi-arrow-up-short w-8 h-8 ${sortOrder === "ASC" ? "" : "rotate-180"}`}
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                                />
                              </svg>
                            )}
                          </Button>
                          <Button
                            className={
                              "flex items-center cursor-pointer px-2 py-1 bg-transparent"
                            }
                            onClick={() => handleSort("makerLast")}
                          >
                            <h1 className={"text-2xl"}>LAST </h1>
                            {sortField === "makerLast" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className={`bi bi-arrow-up-short w-8 h-8 ${sortOrder === "ASC" ? "" : "rotate-180"}`}
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                                />
                              </svg>
                            )}
                          </Button>
                          <Button
                            className={
                              "flex items-center cursor-pointer px-2 py-1 bg-transparent"
                            }
                            onClick={() => handleSort("makeYear")}
                          >
                            <h1 className={"text-2xl font-thin"}>YEAR </h1>
                            {sortField === "makeYear" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className={`bi bi-arrow-up-short w-8 h-8 ${sortOrder === "ASC" ? "" : "rotate-180"}`}
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                                />
                              </svg>
                            )}
                          </Button>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Apply
                        </Button>
                      </ModalFooter>
                    </div>
                  )}
                </ModalContent>
              </Modal>
            </div>

            {isLargeScreen && (
              <div
                className={
                  "flex gap-x-4 flex-wrap  items-center justify-center"
                }
              >
                <Button
                  className={
                    "flex items-center cursor-pointer px-2 py-1 bg-transparent text-black"
                  }
                  onClick={() => handleSort("makerFirst")}
                >
                  <h1 className={"text-2xl"}>FIRST </h1>
                  {sortField === "makerFirst" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className={`bi bi-arrow-up-short w-8 h-8 ${sortOrder === "ASC" ? "" : "rotate-180"}`}
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                      />
                    </svg>
                  )}
                </Button>
                <Button
                  className={
                    "flex items-center cursor-pointer px-2 py-1 bg-transparent text-black"
                  }
                  onClick={() => handleSort("makerLast")}
                >
                  <h1 className={"text-2xl"}>LAST </h1>
                  {sortField === "makerLast" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className={`bi bi-arrow-up-short w-8 h-8 ${sortOrder === "ASC" ? "" : "rotate-180"}`}
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                      />
                    </svg>
                  )}
                </Button>
                <Button
                  className={
                    "flex items-center cursor-pointer px-2 py-1 bg-transparent text-black"
                  }
                  onClick={() => handleSort("makeYear")}
                >
                  <h1 className={"text-2xl font-thin"}>YEAR </h1>
                  {sortField === "makeYear" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className={`bi bi-arrow-up-short w-8 h-8 ${sortOrder === "ASC" ? "" : "rotate-180"}`}
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                      />
                    </svg>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className={""}>
          <div className="">
            {instruments ? (
              instruments.map((instrument: Instrument) => (
                <ProductCardTest
                  key={instrument.id}
                  product={instrument}
                  loaded={isLoading}
                />
              ))
            ) : (
              <div
                className={
                  "bg-white w-screen flex items-center justify-center py-10"
                }
              >
                <Spinner className={"bg-white "} />
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex items-center gap-8 bg-gray-50 justify-center border-t py-4">
        <button
          disabled={hasPrev || true}
          onClick={() => handlePageChange(pagestate?.page - 1)}
          className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <p className="text-slate-600">
          Page <strong className="text-slate-800">{pagestate?.page}</strong> of{" "}
          <strong className="text-slate-800">
            {Math.ceil((total || 0) / pagestate?.perPage)}
          </strong>
        </p>

        <button
          disabled={!pageInfo?.hasNextPage}
          onClick={() => handlePageChange(pagestate?.page + 1)}
          className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InstrumentList;
