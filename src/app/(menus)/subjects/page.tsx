import BackButton from "@/components/back-button";
import MenuButton from "@/components/menu-button";

export default function SubjectsPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <div className="flex items-center gap-8">
        <BackButton />
        <h1 className="text-3xl">Choose the subject you want to learn</h1>
      </div>
      <div className="flex flex-col gap-4">
        <MenuButton
          href="/subjects/english"
          className="border-blue-800 bg-blue-500 hover:bg-blue-600"
        >
          English
        </MenuButton>
        <MenuButton
          href="/subjects/filipino"
          className="border-red-800 bg-red-600 hover:bg-red-700"
        >
          Filipino
        </MenuButton>
        <MenuButton
          href="/subjects/math"
          className="border-green-800 bg-green-500 hover:bg-green-600"
        >
          Mathematics
        </MenuButton>
      </div>
    </div>
  );
}
