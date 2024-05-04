import MenuButton from "@/components/menu-button";

export default function MainMenuPage() {
  return (
    <main className="h-full">
      <div className="flex h-full flex-col items-center justify-center gap-16">
        <h1 className="text-3xl">Main Menu</h1>
        <div className="flex flex-col gap-4">
          <MenuButton href="/subjects">Subjects</MenuButton>
          <MenuButton href="/settings">Settings</MenuButton>
          <MenuButton href="/about">About</MenuButton>
          <MenuButton href="/">Exit</MenuButton>
        </div>
      </div>
    </main>
  );
}
