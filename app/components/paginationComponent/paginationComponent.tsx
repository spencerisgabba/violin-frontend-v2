import { FC } from "react";
import { Pagination } from "@nextui-org/pagination";
import {PaginationProps} from "@/app/interfaces/interfaces";

const PaginationComponent: FC<PaginationProps> = ({ pagination, onPageChange, totalItems }) => {
    const totalPages = Math.ceil(totalItems / pagination.perPage);


  return (
    <Pagination
      total={totalPages} // Assuming total pages are calculated elsewhere
      initialPage={pagination.page}
      onChange={onPageChange}
      color="warning"
    />
  );
};

export default PaginationComponent;