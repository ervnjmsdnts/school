"use client";
import MenuButton from "@/components/menu-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export default function MainMenuPage() {
  const cookies = useCookies();
  const router = useRouter();
  const handleExit = () => {
    cookies.remove("student");
    router.push("/");
  };
  return (
    <main className="h-full">
      <div className="flex h-full flex-col items-center justify-center gap-16">
        <h1 className="text-3xl">Main Menu</h1>
        <div className="flex flex-col gap-4">
          <MenuButton href="/subjects">Subjects</MenuButton>
          <MenuButton href="/settings">Settings</MenuButton>
          <MenuButton href="/about">About</MenuButton>
          <Dialog>
            <DialogTrigger>
              <Button
                size="xl"
                className={cn(
                  "w-full border-2 border-border text-2xl hover:animate-pulse",
                )}
              >
                Exit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-xl">
                Are you sure you want to exit?
              </DialogTitle>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="text-lg" variant="outline">
                    No
                  </Button>
                </DialogClose>
                <Button onClick={handleExit} className="text-lg">
                  Yes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
