"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { Activity, Student } from "@/lib/types";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Results({
  score,
  quiz,
  answerList,
}: {
  score: number;
  quiz: Activity;
  answerList: (number | null)[];
}) {
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const student = JSON.parse(localStorage.getItem("student")!) as Student;
      const ref = collection(db, "scores");
      await addDoc(ref, {
        score,
        studentName: student.name,
        quizName: quiz.name,
        subject: quiz.subject,
        type: quiz.type,
        createdAt: new Date().getTime(),
      });
      router.back();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-full bg-amber-800 p-8">
      <div className="h-full border border-amber-900 p-4">
        <div className="mx-auto flex h-full max-w-[600px] flex-col rounded-lg bg-white p-4">
          <div className="h-0 flex-grow overflow-auto">
            <div className="flex items-center gap-2">
              <p className="text-2xl">Your Score:</p>
              <p className="text-xl">
                {score}/{quiz.questions.length}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {quiz.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="flex flex-col gap-2">
                  <p className="text-lg font-bold">
                    {questionIndex + 1}. {question.question}
                  </p>
                  <div className="flex flex-col gap-2">
                    {question.options.map(
                      (choice: any, choiceIndex: number) => (
                        <p
                          key={choiceIndex}
                          className={`rounded-md p-2 ${
                            answerList[questionIndex] === choiceIndex
                              ? question.answer === choiceIndex
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                              : question.answer === choiceIndex
                                ? "bg-amber-600 text-white"
                                : `border border-amber-600`
                          }`}
                        >
                          {choice}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-8 w-full text-xl" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
