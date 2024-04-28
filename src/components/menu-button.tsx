"use client";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface MenuButtonProps extends PropsWithChildren {
  href: string;
}

export default function MenuButton({ href, children }: MenuButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-lg border-2 border-amber-800 bg-amber-600 px-16 py-8 text-center text-xl font-bold text-white hover:animate-pulse"
    >
      {children}
    </Link>
  );
}
