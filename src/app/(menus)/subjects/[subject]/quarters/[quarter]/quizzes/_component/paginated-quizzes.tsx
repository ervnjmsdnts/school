"use client";

import MenuButton from "@/components/menu-button";
import Pagination from "@/components/pagination";
import usePagination from "@/hooks/use-pagination";
import { Activity } from "@/lib/types";
import { useParams } from "next/navigation";

type ActivitiesType = {
  name: string;
};

export default function PaginatedQuizzes({ quizzes }: { quizzes: Activity[] }) {
  const params = useParams<{ quarter: string; subject: string }>();
  const baseUrl = `/subjects/${params.subject}/quarters/${params.quarter}/quizzes`;

  const { currentItems, currentPage, paginate, totalPages } =
    usePagination(quizzes);

  return (
    <div className="flex w-96 flex-col gap-8">
      <div className="flex flex-col gap-4">
        {currentItems.map((quiz, index) => (
          <MenuButton key={index} href={`${baseUrl}/${quiz.id}`}>
            {quiz.name}
          </MenuButton>
        ))}
        <Pagination
          currentPage={currentPage}
          paginate={paginate}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
