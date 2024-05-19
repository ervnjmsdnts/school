import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full">
      <div className="fixed -z-10 h-screen w-screen">
        <Image
          src="/start-screen.gif"
          alt="splashscreen"
          objectFit="fill"
          fill
        />
      </div>
      <div className="flex h-full items-center justify-center">
        <Link
          href="/input-name"
          className="mt-8 animate-bounce text-4xl font-bold uppercase text-white"
        >
          Click here to start
        </Link>
      </div>
    </main>
  );
}
