"use client";
import BackButton from "@/components/back-button";
import PaginatedQuizzes from "./_component/paginated-quizzes";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Activity } from "@/lib/types";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function QuizzesPage({}) {
  const { quarter, subject } = useParams<{
    subject: string;
    quarter: string;
  }>();
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<Activity[]>([]);

  useEffect(() => {
    (async () => {
      const quizzesRef = collection(db, "activities");
      const q = query(
        quizzesRef,
        where("subject", "==", subject),
        where("type", "==", quarter),
      );
      const snapshot = await getDocs(q);
      let data: Activity[] = [];
      snapshot.forEach((doc) =>
        data.push({
          questions: doc.data().questions,
          subject: doc.data().subject,
          type: doc.data().type,
          createdAt: doc.data().createdAt,
          id: doc.id,
          name: doc.data().name,
        }),
      );
      const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);

      setQuizzes(sortedData);
      setIsLoading(false);
    })();
  }, [quarter, subject]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <div className="flex items-center gap-8">
        <BackButton />
        <h1 className="text-3xl">
          {subject.toUpperCase()} {quarter} Quarter Quizzes
        </h1>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <PaginatedQuizzes quizzes={quizzes} />
      )}
    </div>
  );
}
