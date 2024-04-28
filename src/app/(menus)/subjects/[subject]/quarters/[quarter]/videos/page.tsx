import BackButton from "@/components/back-button";
import MenuButton from "@/components/menu-button";
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

  console.log({ params, filteredVideos });

  const baseUrl = `/subjects/${params.subject}/quarters/${params.quarter}/videos`;

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col gap-16">
        <div className="flex items-center gap-8">
          <BackButton />
          <h2 className="text-3xl">
            {params.subject.toUpperCase()} {params.quarter} Quarter Videos
          </h2>
        </div>
        {filteredVideos.length > 1 ? (
          <div className="grid grid-cols-2 gap-2">
            {filteredVideos.map((video, index) => (
              <MenuButton
                key={index}
                href={`${baseUrl}/${video.name.split(" ").join("")}`}
              >
                {video.name}
              </MenuButton>
            ))}
          </div>
        ) : (
          <>
            {filteredVideos.map((video, index) => (
              <MenuButton
                key={index}
                href={`${baseUrl}/${video.name.split(" ").join("")}`}
              >
                {video.name}
              </MenuButton>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
