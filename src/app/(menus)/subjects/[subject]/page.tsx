import BackButton from "@/components/back-button";
import MenuButton from "@/components/menu-button";

export default function SubjectPage({
  params,
}: {
  params: { subject: string };
}) {
  const baseUrl = `/subjects/${params.subject}`;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <div className="flex items-center gap-8">
        <BackButton />
        <h1 className="text-3xl">
          {params.subject === "math"
            ? "MATHEMATICS"
            : params.subject.toUpperCase()}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <MenuButton href={`${baseUrl}/quarters`}>Choose Quarter</MenuButton>
        <MenuButton href={`${baseUrl}/advance-lessons`}>
          Advanced Lessons
        </MenuButton>
      </div>
    </div>
  );
}
