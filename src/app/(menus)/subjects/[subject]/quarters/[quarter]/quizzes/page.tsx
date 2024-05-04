import BackButton from "@/components/back-button";
import PaginatedQuizzes from "./_component/paginated-quizzes";

const activities = [
  {
    name: "Test",
  },
  { name: "Testing" },
  { name: "Tester" },
  { name: "Hello" },
  { name: "Hi" },
  { name: "AAA" },
  { name: "BBB" },
  { name: "CCC" },
];

export default function ActivitiesPage({
  params,
}: {
  params: { subject: string; quarter: string };
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <div className="flex items-center gap-8">
        <BackButton />
        <h1 className="text-3xl">
          {params.subject.toUpperCase()} {params.quarter} Quarter Quizzes
        </h1>
      </div>
      <PaginatedQuizzes activities={activities} />
    </div>
  );
}
