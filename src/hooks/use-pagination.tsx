"use client";
import { useState } from "react";

export default function usePagination<T>(
  totalItems: T[],
  sortFn?: (a: T, b: T) => number,
) {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const currentItems = totalItems
    .sort(sortFn)
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(totalItems.length / itemsPerPage);

  return {
    currentPage,
    paginate,
    currentItems,
    totalPages,
  };
}
