import BackButton from "@/components/back-button";
import PDFRenderer from "@/components/pdf-renderer";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

async function PDF({ params }: { params: { id: string } }) {
  const lessonRef = doc(db, "lessons", `${params.id}`);
  const lesson = await getDoc(lessonRef);
  return (
    <div className="flex h-full flex-1 flex-col gap-4 p-8">
      <div className="flex items-center gap-2 rounded-lg bg-white p-2 ">
        <BackButton />
        <h2 className="text-center text-xl text-amber-800">
          {lesson.data()?.name}
        </h2>
      </div>
      <PDFRenderer url={lesson.data()?.url} />
    </div>
  );
}

export default async function LessonPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex h-full flex-1 flex-col justify-between">
      <div className="mx-auto h-full w-full max-w-4xl grow">
        <div className="flex h-full w-full flex-1">
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            }
          >
            <PDF params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
