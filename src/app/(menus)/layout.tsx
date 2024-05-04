"use client";
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
        <Image src="/menu.gif" alt="menu" objectFit="fill" layout="fill" />
      </div>
      {pathname !== "/main-menu" && (
        <Button
          onClick={() => router.push("/main-menu")}
          size="icon"
          className="absolute left-5 top-5 rounded-full"
        >
          <Home />
        </Button>
      )}
      {children}
    </div>
  );
}
