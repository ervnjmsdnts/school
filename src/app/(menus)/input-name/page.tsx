"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function InputNamePage() {
  return (
    <div className="h-full">
      <form className="flex h-full flex-col items-center justify-center gap-4">
        <Input className="max-w-64 p-4 text-xl" placeholder="Input name..." />
        <Button
          asChild
          className="border-border border-2 text-xl hover:animate-pulse"
          size="lg"
        >
          <Link href="/main-menu">Submit</Link>
        </Button>
      </form>
    </div>
  );
}
