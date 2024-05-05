"use client";
import BackButton from "@/components/back-button";
import MenuButton from "@/components/menu-button";
import Pagination from "@/components/pagination";
import usePagination from "@/hooks/use-pagination";
import { db } from "@/lib/firebase";
import { LessonInfo } from "@/lib/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdvancedLessonsPage({
  params,
}: {
  params: { subject: string; quarter: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useState<LessonInfo[]>([]);

  useEffect(() => {
    (async () => {
      const lessonsRef = collection(db, "lessons");
      const q = query(
        lessonsRef,
        where("subject", "==", params.subject),
        where("type", "==", "advanced"),
      );
      const snapshot = await getDocs(q);
      let data: LessonInfo[] = [];
      snapshot.forEach((doc) =>
        data.push({
          createdAt: doc.data().createdAt,
          id: doc.id,
          name: doc.data().name,
        }),
      );
      const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);

      setLessons(sortedData);
      setIsLoading(false);
    })();
  }, [params.subject, params.quarter]);

  const baseUrl = `/subjects/${params.subject}/advance-lessons`;

  const { currentItems, currentPage, paginate, totalPages } =
    usePagination(lessons);
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-full flex-col justify-center gap-16">
        <div className="flex items-center gap-8">
          <BackButton />
          <h2 className="text-3xl">
            {params.subject.toUpperCase()} {params.quarter} Quarter Lessons
          </h2>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="flex items-center justify-center">
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
          </div>
        )}
      </div>
    </div>
  );
}
