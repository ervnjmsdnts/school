import BackButton from "@/components/back-button";
import MenuButton from "@/components/menu-button";

export default function QuarterPage({
  params,
}: {
  params: { quarter: string; subject: string };
}) {
  const baseUrl = `/subjects/${params.subject}/quarters/${params.quarter}`;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <div className="flex items-center gap-8">
        <BackButton />
        <h1 className="text-3xl">
          {params.subject.toUpperCase()} {params.quarter} Quarter
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <MenuButton href={`${baseUrl}/lessons`}>Lessons</MenuButton>
        <MenuButton href={`${baseUrl}/activities`}>Activities</MenuButton>
        <MenuButton href={`${baseUrl}/videos`}>Videos</MenuButton>
        <MenuButton href={`${baseUrl}/scores`}>Scores</MenuButton>
      </div>
    </div>
  );
}
