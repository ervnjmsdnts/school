"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type AudioContentType = {
  changeValue: (value: number) => void;
  value: number;
  isMuted: boolean;
  changeMuted: (value: boolean) => void;
};

const AudioContext = createContext<AudioContentType>({} as AudioContentType);

export default function AudioProvider({ children }: PropsWithChildren) {
  const [value, setValue] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const changeValue = (value: number) => {
    setValue(value);
  };

  const changeMuted = (value: boolean) => {
    setIsMuted(value);
  };

  return (
    <AudioContext.Provider value={{ changeValue, value, isMuted, changeMuted }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
