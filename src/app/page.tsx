import Image from "next/image";
import Link from "next/link";
import StartScreenGif from "@/assets/start-screen.gif";
import StartButton from "@/assets/start-button.png";

export default function Home() {
  return (
    <main className="h-full">
      <div className="fixed -z-10 h-screen w-screen">
        <Image src={StartScreenGif} alt="splashscreen" objectFit="fill" fill />
      </div>
      <div className="flex h-full items-center justify-center">
        <Link href="/input-name">
          <div className="relative top-16 h-64 w-80">
            <Image src={StartButton} alt="Start Button" layout="fill" />
          </div>
        </Link>
      </div>
    </main>
  );
}
