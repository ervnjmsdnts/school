import BackButton from "@/components/back-button";
import MenuButton from "@/components/menu-button";

export default function LessonsPage({
  params,
}: {
  params: { subject: string; quarter: string };
}) {
  const baseUrl = `/subjects/${params.subject}/quarters/${params.quarter}/lessons`;
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col gap-16">
        <div className="flex items-center gap-8">
          <BackButton />
          <h2 className="text-3xl">
            {params.subject.toUpperCase()} {params.quarter} Quarter Lessons
          </h2>
        </div>
        <div className="grid gap-4">
          <MenuButton href={`${baseUrl}/jfioewa`}>Test</MenuButton>
        </div>
      </div>
    </div>
  );
}
