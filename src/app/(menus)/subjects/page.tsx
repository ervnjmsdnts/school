import BackButton from "@/components/back-button";
import MenuButton from "@/components/menu-button";
import Link from "next/link";

export default function SubjectsPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <div className="flex items-center gap-8">
        <BackButton />
        <h1 className="text-3xl">Choose the subject you want to learn</h1>
      </div>
      <div className="flex items-center gap-4">
        <MenuButton href="/subjects/english">English</MenuButton>
        <MenuButton href="/subjects/filipino">Filipino</MenuButton>
        <MenuButton href="/subjects/math">Math</MenuButton>
      </div>
    </div>
  );
}
