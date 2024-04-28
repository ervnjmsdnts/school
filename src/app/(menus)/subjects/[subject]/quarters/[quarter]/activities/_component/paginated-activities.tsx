"use client";

import MenuButton from "@/components/menu-button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

type ActivitiesType = {
  name: string;
};

export default function PaginatedActivities({
  activities,
}: {
  activities: ActivitiesType[];
}) {
  const params = useParams<{ quarter: string; subject: string }>();
  const baseUrl = `/subjects/${params.subject}/quarters/${params.quarter}/activities`;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = activities.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(activities.length / itemsPerPage);

  return (
    <div className="flex w-96 flex-col gap-8">
      <div className="flex flex-col gap-4">
        {currentItems.map((activity, index) => (
          <MenuButton key={index} href={`${baseUrl}/fjioewa`}>
            {activity.name}
          </MenuButton>
        ))}
      </div>
      <div className="flex items-center justify-end gap-8">
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center justify-end gap-2">
          <button
            disabled={currentPage === 1}
            className={cn(
              "rounded-full border-2 border-amber-800 bg-amber-600 p-2 disabled:cursor-not-allowed disabled:bg-amber-400",
            )}
            onClick={() => paginate(currentPage - 1)}
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            className={cn(
              "rounded-full border-2 border-amber-800 bg-amber-600 p-2 disabled:cursor-not-allowed disabled:bg-amber-400",
            )}
            onClick={() => paginate(currentPage + 1)}
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
