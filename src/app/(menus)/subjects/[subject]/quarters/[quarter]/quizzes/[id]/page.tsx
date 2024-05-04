"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const questions = [
  {
    question: "Hi how are you?",
    options: ["Fine", "Good", "Sad", "Happy"],
    answer: 0,
    image: null,
  },
  {
    question: "My name?",
    options: ["Joe", "Bob", "Jane", "John"],
    answer: 1,
    image: true,
  },
];

export default function ActivityPage({ params }: { params: { id: string } }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const router = useRouter();

  const handleNextQuestion = () => {
    if (selected === questions[questionIndex].answer) {
      setScore((prev) => prev + 1);
    }
    if (questionIndex < questions.length - 1) {
      setSelected(null);
      setQuestionIndex((prev) => prev + 1);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="relative h-full bg-amber-800">
      <button
        onClick={() => router.back()}
        className="absolute left-3 top-3 rounded-full bg-amber-600 p-2"
      >
        <ArrowLeft className="h-8 w-8 text-white" />
      </button>
      {!showScore ? (
        <div className="grid h-full grid-rows-2 gap-8 p-8">
          {/* Questions */}
          <div className="rounded-lg border border-amber-900 p-8 text-white">
            <div
              className={cn("flex h-full items-center justify-center gap-8")}
            >
              {questions[questionIndex].image && (
                <div className="relative aspect-video h-full">
                  <Image src="/startBtn.png" alt="Logo" layout="fill" />
                </div>
              )}
              <div className="flex w-full flex-1 justify-center">
                <p className="max-w-96 text-center text-2xl">
                  {questions[questionIndex].question}
                </p>
              </div>
            </div>
          </div>
          {/* Options */}
          <div className="flex flex-col gap-4">
            <div className="grid h-full w-full grid-cols-4 gap-2">
              {questions[questionIndex].options.map((option, index) => (
                <button
                  onClick={() => setSelected(index)}
                  className={cn(
                    "relative h-full w-full rounded-lg text-xl text-white",
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
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={selected === null}
                className="flex items-center gap-4 rounded-lg bg-amber-600 p-2 text-white disabled:bg-gray-500"
              >
                Next
                <ArrowRight className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-white">
          <p className="text-2xl">Your Score:</p>
          <p className="text-xl">
            {score}/{questions.length}
          </p>
        </div>
      )}
    </div>
  );
}
