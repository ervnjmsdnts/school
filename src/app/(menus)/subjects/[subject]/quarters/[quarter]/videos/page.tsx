"use client";
import BackButton from "@/components/back-button";
import MenuButton from "@/components/menu-button";
import Pagination from "@/components/pagination";
import usePagination from "@/hooks/use-pagination";
import { videos } from "@/lib/videos";

export default function VideosPage({
  params,
}: {
  params: { subject: string; quarter: string };
}) {
  const filteredVideos = videos.filter(
    (video) =>
      video.topic.subject === params.subject &&
      video.topic.quarter === params.quarter,
  );

  const { currentItems, currentPage, paginate, totalPages } =
    usePagination(filteredVideos);

  const baseUrl = `/subjects/${params.subject}/quarters/${params.quarter}/videos`;

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col gap-16">
        <div className="flex items-center justify-center gap-8">
          <BackButton />
          <h2 className="text-3xl">
            {params.subject.toUpperCase()} {params.quarter} Quarter Videos
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {currentItems.map((video, index) => (
                <MenuButton key={index} href={`${baseUrl}/${video.id}`}>
                  {video.name}
                </MenuButton>
              ))}
              <Pagination
                currentPage={currentPage}
                paginate={paginate}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
