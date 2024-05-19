"use client";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface MenuButtonProps extends PropsWithChildren {
  href: string;
  className?: string;
}

export default function MenuButton({
  href,
  children,
  className,
}: MenuButtonProps) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Button
      size="xl"
      className={cn(
        "border-2 border-border text-2xl hover:animate-pulse",
        className,
        pathname.includes("english") &&
          "border-blue-800 bg-blue-500 hover:bg-blue-600",
        pathname.includes("filipino") &&
          "border-red-800 bg-red-600 hover:bg-red-700",
        pathname.includes("math") &&
          "border-green-800 bg-green-500 hover:bg-green-600",
      )}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
