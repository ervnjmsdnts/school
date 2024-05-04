import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full">
      <div className="fixed -z-10 h-screen w-screen">
        <Image
          src="/main.gif"
          alt="splashscreen"
          objectFit="fill"
          layout="fill"
        />
      </div>
      <div className="flex h-full items-center justify-center">
        <Link href="/input-name">
          <div className="relative top-16 h-64 w-80">
            <Image
              src="/startBtn.png"
              className="animate-bounce"
              alt="Start Button"
              layout="fill"
            />
          </div>
        </Link>
      </div>
    </main>
  );
}
