"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/lib/firebase";
import { Activity, Student } from "@/lib/types";
import { addDoc, collection } from "firebase/firestore";
import { useCookies } from "next-client-cookies";
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
  const cookie = useCookies().get("student");
  const handleSubmit = async () => {
    try {
      const student = JSON.parse(cookie ?? "{}") as Student;
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
                              : "border border-amber-600"
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-8 w-full text-xl">Submit</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    Are you sure you want to submit your quiz?
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="text-lg"
                    variant="outline"
                    onClick={() => window.location.reload()}
                  >
                    No
                  </Button>
                  <Button className="text-lg" onClick={handleSubmit}>
                    Yes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
