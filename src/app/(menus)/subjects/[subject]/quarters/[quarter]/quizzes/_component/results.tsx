import { Button } from "@/components/ui/button";
import { Activity } from "@/lib/types";

export default function Results({
  score,
  questions,
  answerList,
}: {
  score: number;
  questions: Activity["questions"];
  answerList: (number | null)[];
}) {
  return (
    <div className="h-full bg-amber-800 p-8">
      <div className="h-full border border-amber-900 p-4">
        <div className="mx-auto flex h-full max-w-[600px] flex-col rounded-lg bg-white p-4">
          <div className="h-0 flex-grow overflow-auto">
            <div className="flex items-center gap-2">
              <p className="text-2xl">Your Score:</p>
              <p className="text-xl">
                {score}/{questions.length}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {questions.map((question, questionIndex) => (
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
            <Button className="mt-8 w-full text-xl">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
