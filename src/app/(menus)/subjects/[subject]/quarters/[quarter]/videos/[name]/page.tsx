import BackButton from "@/components/back-button";
import { videos } from "@/lib/videos";

export default function VideoPage({ params }: { params: { name: string } }) {
  const video = videos.find(
    (video) => video.name.split(" ").join("") === params.name,
  ) as (typeof videos)[number];

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col gap-16">
        <div className="flex items-center gap-2">
          <BackButton />
          <h2 className="text-3xl">{video.name}</h2>
        </div>
        <div className="aspect-video h-full w-full">
          <iframe
            src={video.url}
            frameBorder="0"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}