"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="group flex items-center justify-center rounded-full border-4 border-amber-800 p-4 hover:bg-amber-600"
    >
      <ArrowLeft className="h-8 w-8 text-amber-600 group-hover:text-main-bg" />
    </button>
  );
}
