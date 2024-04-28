"use client";
import BackButton from "@/components/back-button";
import PDFRenderer from "@/components/pdf-renderer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LessonPage() {
  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="mx-auto w-full max-w-4xl grow">
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col gap-4 p-8">
            <div className="flex items-center gap-2 rounded-lg bg-white p-2 ">
              <BackButton />
              <h2 className="text-center text-xl text-amber-800">Title</h2>
            </div>
            <PDFRenderer
              url={
                "https://utfs.io/f/d0b79411-1453-4a72-984f-edf73f7f4cd7-8tcto4.pdf"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
