"use client";
import { useAudio } from "@/components/audio-content";
import BackButton from "@/components/back-button";
import { Slider } from "@/components/ui/slider";

export default function SettingsPage() {
  const { changeValue, value } = useAudio();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <div className="flex items-center gap-8">
        <BackButton />
        <h1 className="text-3xl">Settings</h1>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <p className="text-xl">Volume:</p>
        <Slider
          className="max-w-80"
          step={0.1}
          min={0}
          max={1}
          value={[value]}
          onValueChange={(val) => changeValue(val[0])}
        />
      </div>
    </div>
  );
}
