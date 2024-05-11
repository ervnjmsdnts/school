"use client";

import BackButton from "@/components/back-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { db } from "@/lib/firebase";
import { Score } from "@/lib/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";

export default function ScoresPage() {
  const { subject, quarter } = useParams<{
    subject: string;
    quarter: string;
  }>();
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState<Score[]>([]);
  const [selected, setSelected] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      const scoresRef = collection(db, "scores");
      const q = query(
        scoresRef,
        where("subject", "==", subject),
        where("type", "==", quarter),
      );
      const snapshot = await getDocs(q);
      let data: Score[] = [];
      snapshot.forEach((doc) =>
        data.push({
          subject: doc.data().subject,
          type: doc.data().type,
          createdAt: doc.data().createdAt,
          id: doc.id,
          quizName: doc.data().quizName,
          score: doc.data().score,
          studentName: doc.data().studentName,
        }),
      );
      setScores(data);
      setIsLoading(false);
    })();
  }, [quarter, subject]);

  const top10ByQuiz = useMemo(() => {
    return scores
      .filter((score) => score.quizName === selected)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [scores, selected]);

  const combinedStudentsScores = useMemo(() => {
    let studentScoresMap = new Map<
      string,
      { score: number; createdAt: number }
    >();

    scores.forEach((doc) => {
      const studentName = doc.studentName;
      const score = doc.score;
      const createdAt = doc.createdAt;

      if (studentScoresMap.has(studentName)) {
        const currentScoreObj = studentScoresMap.get(studentName)!;
        studentScoresMap.set(studentName, {
          score: currentScoreObj.score + score,
          createdAt: currentScoreObj.createdAt, // Retain the original createdAt
        });
      } else {
        studentScoresMap.set(studentName, { score, createdAt });
      }
    });

    const combinedStudentScores = Array.from(studentScoresMap)
      .map(([studentName, scoreObj]) => ({
        studentName,
        score: scoreObj.score,
        createdAt: scoreObj.createdAt,
      }))
      .sort((a, b) => b.score - a.score);

    return combinedStudentScores;
  }, [scores]);

  const scoresToDisplay = selected ? top10ByQuiz : combinedStudentsScores;

  const quizzes = useMemo(() => {
    const uniqueNames: string[] = [];
    scores.forEach((item) => {
      if (!uniqueNames.includes(item.quizName)) uniqueNames.push(item.quizName);
    });
    return uniqueNames.sort();
  }, [scores]);

  const handleSelected = (quiz: string) => {
    if (selected === quiz) {
      setSelected(null);
    } else {
      setSelected(quiz);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <div className="flex items-center gap-8">
        <BackButton />
        <h3 className="text-3xl">Leaderboard</h3>
      </div>
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="flex w-full max-w-[600px] flex-col gap-4 rounded-lg bg-white p-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {quizzes.map((quiz, index) => (
              <Toggle
                key={index}
                pressed={quiz === selected}
                onPressedChange={() => handleSelected(quiz)}
              >
                <p className="max-w-64 truncate text-xl">{quiz}</p>
              </Toggle>
            ))}
          </div>
          <div className="">
            <Table className="text-xl">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Score</TableHead>
                  {selected && <TableHead>Date & Time</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoresToDisplay.map((score, index) => (
                  <TableRow key={index}>
                    <TableCell>{score.studentName}</TableCell>
                    <TableCell>{score.score}</TableCell>
                    {selected && (
                      <TableCell>{format(score.createdAt, "Pp")}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
