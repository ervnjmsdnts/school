"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFRenderer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState(1);

  const validator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  type Validator = z.infer<typeof validator>;

  const form = useForm<Validator>({
    defaultValues: { page: "1" },
    resolver: zodResolver(validator),
  });
  const { width, ref } = useResizeDetector();

  const [scale, setScale] = useState(1);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedScale !== scale;

  const submit = (data: { page: string }) => {
    setCurrPage(Number(data.page));
    form.setValue("page", String(data.page));
  };

  return (
    <div className="flex h-full w-full flex-col items-center rounded-lg bg-white shadow-md">
      <div className="flex w-full items-center justify-between border-b border-zinc-200">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              form.setValue("page", String(currPage - 1));
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              {...form.register("page")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  form.handleSubmit(submit)();
                }
              }}
              className={cn(
                "h-8 w-12",
                form.formState.errors.page && "focus-visible:ring-red-400",
              )}
            />
            <p className="space-x-1 text-sm">
              <span>/</span>
              <span>{numPages ?? "x"}</span>
            </p>
          </div>

          <Button
            disabled={numPages === undefined || currPage === numPages}
            variant="ghost"
            onClick={() => {
              setCurrPage((prev) =>
                prev + 1 > numPages! ? numPages! : prev + 1,
              );
              form.setValue("page", String(currPage + 1));
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="w-full flex-1">
        <div ref={ref}>
          <Document
            file={url}
            onLoadError={() =>
              toast.error("Error loading PDF: Please try again later")
            }
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <div className="flex justify-center">
                <Loader2 className="my-24 h-4 w-4 animate-spin" />
              </div>
            }
          >
            {isLoading && renderedScale ? (
              <Page
                width={width ? width : 1}
                pageNumber={currPage}
                scale={scale}
                key={"@" + renderedScale}
              />
            ) : null}

            <Page
              className={cn(isLoading ? "hidden" : "")}
              width={width ? width : 1}
              pageNumber={currPage}
              scale={scale}
              key={"@" + scale}
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onRenderSuccess={() => setRenderedScale(scale)}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
