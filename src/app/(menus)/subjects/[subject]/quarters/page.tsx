import BackButton from "@/components/back-button";
import MenuButton from "@/components/menu-button";

export default function QuartersPage({
  params,
}: {
  params: { subject: string };
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <div className="flex items-center gap-8">
        <BackButton />
        <h1 className="text-3xl">Choose which quarter</h1>
      </div>
      <div className="flex items-center gap-4">
        <MenuButton href={`/subjects/${params.subject}/quarters/1st`}>
          1st Quarter
        </MenuButton>
        <MenuButton href={`/subjects/${params.subject}/quarters/2nd`}>
          2nd Quarter
        </MenuButton>
        <MenuButton href={`/subjects/${params.subject}/quarters/3rd`}>
          3rd Quarter
        </MenuButton>
        <MenuButton href={`/subjects/${params.subject}/quarters/4th`}>
          4th Quarter
        </MenuButton>
      </div>
    </div>
  );
}
