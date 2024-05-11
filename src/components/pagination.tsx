import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  paginate,
}: {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}) {
  return (
    <div className="flex items-center justify-end gap-8">
      <span className="text-xl">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex items-center justify-end gap-2">
        <button
          disabled={currentPage === 1}
          className={cn(
            "rounded-full border-2 border-amber-800 bg-amber-600 p-2 disabled:cursor-not-allowed disabled:bg-amber-400",
          )}
          onClick={() => paginate(currentPage - 1)}
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </button>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          className={cn(
            "rounded-full border-2 border-amber-800 bg-amber-600 p-2 disabled:cursor-not-allowed disabled:bg-amber-400",
          )}
          onClick={() => paginate(currentPage + 1)}
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  );
}
