"use client";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface MenuButtonProps extends PropsWithChildren {
  href: string;
  className?: string;
}

export default function MenuButton({
  href,
  children,
  className,
}: MenuButtonProps) {
  return (
    <Button
      size="xl"
      className={cn(
        "border-2 border-border text-2xl hover:animate-pulse",
        className,
      )}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
