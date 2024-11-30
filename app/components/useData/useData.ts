"use client";
import useSWR from "swr";
import axios from "axios";
import qs from "qs";
import {
  ApiResponse,
  BowResponse,
  Instrument,
} from "@/app/interfaces/interfaces";
const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
// const fetcher = (arg: { url: string; query?: string }) =>
//   axios
//     .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${arg.url}`)
//     .then((res) => res.data);

// Hook for fetching blog posts
export function useBlogPosts(page: number, searchEntry: string) {
  const { data, error, isLoading } = useSWR(
    `${baseUrl}/blogs?page=${page}&filter[search]=${searchEntry}`,
    fetcher,
  );
  return {
    posts: data?.data,
    total: data?.total,
    pagination: data?.pagination,
    isLoading,
    isError: error,
  };
}

// Hook for fetching instruments
export function useInstrument(
  page: number,
  searchEntry: string,
  category: string,
  sortOrder: string,
  sortField: string,
) {
  const params = {
    page: page,

    sort: {
      field: sortField,
      order: sortOrder,
    },

    filter: {
      search: searchEntry,
    },
  };
  const query = qs.stringify(params, {
    arrayFormat: "brackets",
    encode: false,
  });
  const { data, error, isLoading } = useSWR<ApiResponse<Instrument>>(
    [`${baseUrl}/${category}?` + query],
    fetcher,
  );
  return {
    instruments: data?.data,
    total: data?.total,
    pagination: data?.pagination,
    pageInfo: data?.pageInfo,
    isLoading,
    isError: error,
  };
}
export function useBows(
  page: number,
  searchEntry: string,
  perPage: number,
  filter: string,
) {
  const params = {
    page: page,

    perPage: perPage,
    filter: {
      search: searchEntry,
      Type: filter,
    },
  };
  const query = qs.stringify(params, {
    arrayFormat: "brackets",
    encode: false,
  });
  const { data, error, isLoading } = useSWR<ApiResponse<BowResponse>>(
    [`${baseUrl}/bows?` + query],
    fetcher,
  );
  console.log(data);
  return {
    instruments: data?.data,
    total: data?.total,
    pagination: data?.pagination,
    pageInfo: data?.pageInfo,
    isLoading,
    isError: error,
  };
}
// Add more hooks as needed for other data types
