import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import AudioPlayer from "@/components/audio-player";
import AudioProvider from "@/components/audio-content";

const inter = Inter({ subsets: ["latin"] });

const kiddos = localFont({ src: "../../public/Kiddos.ttf" });

export const metadata: Metadata = {
  title: "SMART KIOSK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kiddos.className}>
        <AudioProvider>
          <AudioPlayer />
          <Toaster position="bottom-center" />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
