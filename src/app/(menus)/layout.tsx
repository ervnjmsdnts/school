"use client";
import Timer from "@/components/timer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="relative h-full w-full">
      <div className="fixed -z-10 h-screen w-screen">
        <Image src="/main-menu.gif" alt="menu" objectFit="fill" layout="fill" />
      </div>
      {![
        "/main-menu",
        "/input-name",
        "/about",
        "/settings",
        "/subjects",
      ].includes(pathname) && (
        <Button
          onClick={() => router.push("/main-menu")}
          size="icon"
          className="absolute left-5 top-5 rounded-full"
        >
          <Home />
        </Button>
      )}
      {pathname !== "/input-name" && (
        <div className="absolute right-5 top-5">
          <Timer />
        </div>
      )}
      {children}
    </div>
  );
}
