"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type AudioContentType = {
  changeValue: (value: number) => void;
  value: number;
};

const AudioContext = createContext<AudioContentType>({} as AudioContentType);

export default function AudioProvider({ children }: PropsWithChildren) {
  const [value, setValue] = useState(0.5);

  const changeValue = (value: number) => {
    setValue(value);
  };

  return (
    <AudioContext.Provider value={{ changeValue, value }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
