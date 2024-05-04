"use client";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Button } from "./ui/button";

interface MenuButtonProps extends PropsWithChildren {
  href: string;
}

export default function MenuButton({ href, children }: MenuButtonProps) {
  return (
    <Button
      size="xl"
      className="border-border border-2 text-xl hover:animate-pulse"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
