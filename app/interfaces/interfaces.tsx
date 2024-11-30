export type Instrument = {
  id: string;
  image: string;
  title: string;
  price: number;
  maker: string;
  location: string;
  makeYear: string;
  makerFirst: string;
  makerLast: string;
  category: string;
  description: string;
  images: string;
  createdAt: {
    value: string;
  };
};

export type BlogFeature = {
  id: string;
  image_url: string;
  title: string;
  subheading: string;
  slug: string;
};
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  content: string;
  subheading: string;
  image_url: string;
  status: string;
  createdAt: {
    value: string;
  };
}
export interface Bow {
  id: string;
  name: string;
  Type: string;
  Price: number;
  data: object;
  pagination: object;
  page: number;
  pageInfo: object;
}
export type PaginationProps = {
  pagination: {
    page: number;
    perPage: number;
  };
  totalItems: number;
  onPageChange: (newPage: number) => void;
};
export type Product = {
  id: string;
  images: string;
  title: string;
  description: string;
  price: number;
  location: string;
  maker: string;
  makeYear: string;
  makerFirst: string;
  makerLast: string;
  category: string;
};

export type ProductCardProps = {
  product: Product;
  loaded: boolean;
};
export interface FilterProps {
  categories: string[];
  onFilterChange: (category: string) => void;
}
export interface ApiResponse<T> {
  id: string;
  loading: boolean;
  data: [T];
  total: number;
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  pagination?: {
    page: number;
    perPage: number;
  };
  sort?: {
    field: string;
    order: string;
  };
  filter?: {
    search: string;
  };
}
export interface BlogResponse {
  id: string;
  loading: boolean;
  data: {
    id: string;
    slug: string;
    title: string;
    author: string;
    content: string;
    subheading: string;
    image_url: string;
    status: string;
    createdAt: {
      value: string;
    };
  };
  total: number;
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
  pagination?: {
    page: number;
    perPage: number;
  } | null;
  sort?: {
    field: string;
    order: string;
  } | null;
  filter?: {
    search: string;
  } | null;
}
export type BowResponse = {
  id: string;
  loading: boolean;
  name: string; // Ensure these properties exist
  Type: string;
  Price: number;
  data: Bow[];
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  pagination?: {
    page: number;
    perPage: number;
  };
  sort?: {
    field: string;
    order: string;
  };
};
