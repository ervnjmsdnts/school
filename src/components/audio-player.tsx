"use client";

import { useEffect, useRef } from "react";
import { useAudio } from "./audio-content";

export default function AudioPlayer() {
  const { value } = useAudio();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }, [value]);

  return <audio ref={audioRef} src="/playful.mp3" loop autoPlay></audio>;
}
