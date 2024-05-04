"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ fn }: { fn?: () => void }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (fn) {
          fn();
        }
        router.back();
      }}
      className="group flex items-center justify-center rounded-full border-4 border-amber-800 p-4 hover:bg-amber-600"
    >
      <ArrowLeft className="group-hover:text-main-bg h-8 w-8 text-amber-600" />
    </button>
  );
}
