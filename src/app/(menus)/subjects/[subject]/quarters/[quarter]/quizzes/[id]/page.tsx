"use client";

import { db } from "@/lib/firebase";
import { Activity } from "@/lib/types";
import { cn } from "@/lib/utils";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Results from "../_component/results";

export default function ActivityPage({
  params,
}: {
  params: { id: string; subject: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState<Activity>({} as Activity);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const router = useRouter();
  const [answerList, setAnswerList] = useState<(number | null)[]>([]);

  useEffect(() => {
    (async () => {
      const quizRef = doc(db, "activities", `${params.id}`);
      const snapshot = await getDoc(quizRef);
      setQuiz({
        id: snapshot.id,
        name: snapshot.data()?.name,
        questions: snapshot.data()?.questions,
        createdAt: snapshot.data()?.createdAt,
        subject: snapshot.data()?.subject,
        type: snapshot.data()?.type,
      });
      setIsLoading(false);
    })();
  }, [params.id]);

  const handleNextQuestion = () => {
    if (selected === quiz.questions[questionIndex].answer) {
      setScore((prev) => prev + 1);
    }

    setAnswerList((prev) => [...prev, selected]);
    if (questionIndex < quiz.questions.length - 1) {
      setSelected(null);
      setQuestionIndex((prev) => prev + 1);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
      setSelected(answerList[questionIndex - 1]);
      setAnswerList((prev) => prev.slice(0, -1));

      if (selected === quiz.questions[questionIndex].answer) {
        setScore((prev) => prev - 1);
      }
    }
  };

  if (showScore) {
    return <Results score={score} quiz={quiz} answerList={answerList} />;
  }

  return (
    <div className="relative h-full">
      <div className="fixed -z-10 h-screen w-screen">
        <Image
          src={
            params.subject === "english"
              ? "/english.gif"
              : params.subject === "filipino"
                ? "/filipino.gif"
                : "/math.gif"
          }
          alt="englishbg"
          objectFit="fill"
          fill
        />
      </div>
      <button
        onClick={() => router.back()}
        className="absolute left-3 top-3 rounded-full bg-amber-600 p-2"
      >
        <ArrowLeft className="h-8 w-8 text-white" />
      </button>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        </div>
      ) : (
        <div className="grid h-full grid-rows-2 gap-8 p-8">
          {/* Questions */}
          <div className="rounded-lg border border-amber-900 p-8">
            <div
              className={cn("flex h-full items-center justify-center gap-8")}
            >
              {quiz.questions[questionIndex].imageUrl && (
                <div className="relative aspect-video h-full">
                  <Image
                    src={quiz.questions[questionIndex].imageUrl!}
                    alt="Logo"
                    layout="fill"
                  />
                </div>
              )}
              <div className="flex w-full flex-1 justify-center">
                <p className="max-w-96 text-center text-4xl">
                  {quiz.questions[questionIndex].question}
                </p>
              </div>
            </div>
          </div>
          {/* Options */}
          <div className="flex flex-col gap-4">
            <div
              className={cn(
                "grid h-full w-full grid-cols-2 gap-2",
                quiz.questions[questionIndex].options.length > 2 &&
                  "grid-cols-4",
              )}
            >
              {quiz.questions[questionIndex].options.map((option, index) => (
                <button
                  onClick={() => setSelected(index)}
                  className={cn(
                    "relative h-full w-full rounded-lg text-4xl text-white",
                    index === 0
                      ? "bg-red-500"
                      : index === 1
                        ? "bg-blue-500"
                        : index === 2
                          ? "bg-teal-500"
                          : "bg-yellow-500",
                  )}
                  key={index}
                >
                  <div
                    className={cn(
                      "absolute right-5 top-5 h-4 w-4 rounded-lg border-2 border-amber-800 bg-white ",
                      selected === index && "bg-green-500",
                    )}
                  />
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={questionIndex === 0}
                className="flex items-center gap-4 rounded-lg bg-amber-600 p-2 text-xl text-white disabled:bg-gray-500"
                aria-disabled={questionIndex === 0}
              >
                <ArrowLeft className="h-8 w-8" />
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={selected === null}
                className="flex items-center gap-4 rounded-lg bg-amber-600 p-2 text-xl text-white disabled:bg-gray-500"
                aria-disabled={selected === null}
              >
                Next
                <ArrowRight className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
