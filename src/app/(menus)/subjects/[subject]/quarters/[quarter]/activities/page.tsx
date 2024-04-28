import BackButton from "@/components/back-button";
import MenuButton from "@/components/menu-button";
import PaginatedActivities from "./_component/paginated-activities";

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
  const baseUrl = `/subjects/${params.subject}/quarters/${params.quarter}/activities`;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <div className="flex items-center gap-8">
        <BackButton />
        <h1 className="text-3xl">
          {params.subject.toUpperCase()} {params.quarter} Quarter Activities
        </h1>
      </div>
      <PaginatedActivities activities={activities} />
    </div>
  );
}
