"use client";
import BackButton from "@/components/back-button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useState } from "react";

const texts = {
  english: {
    p1: '"Student Mastery and Academic Resource Terminal" (SMART) for Grade 2 students of Marawoy Elementary School! S.M.A.R.T. is your ultimate companion in learning, designed specifically to support and enhance the educational journey of young learners. Our kiosk blends fun and education seamlessly, offering a range of interactive resources and tools to help students master academic skills while having a great time',
    p2: "S.M.A.R.T. provides engaging activities and educational quizzes, videos and books tailored to Grade 2 curriculum standards. From math challenges to language arts exercises, students can explore various subjects in an exciting and immersive way. The kiosk features colorful graphics, friendly interfaces, and intuitive controls, making learning a delightful adventure for every child.",
    helper: "Creators:",
    list: [
      "Software Developer: Gerick O. Recinto",
      "Hardware Creator: Chrystian Dominic Recio",
      "Designer and Music: Eduard C. Morete",
      "Contents Maker: Kaye Valenzuela",
    ],
  },
  tagalog: {
    p1: '"Student Mastery and Academic Resource Terminal" (SMART) para sa mga mag-aaral sa Baitang 2 ng Marawoy Elementary School! Ang S.M.A.R.T. ay ang iyong tunay na kasama sa pag-aaral, partikular na idinisenyo upang suportahan at pahusayin ang pang-edukasyon na paglalakbay ng mga batang mag-aaral. Ang aming kiosk ay pinagsasama ang saya at edukasyon nang walang putol, na nag-aalok ng isang hanay ng mga interactive na mapagkukunan at tool upang matulungan ang mga mag-aaral na makabisado ang mga kasanayang pang-akademiko habang nagkakaroon ng magandang oras.',
    p2: "S.M.A.R.T. nagbibigay ng mga aktibidad at pang-edukasyon na pagsusulit, mga video at aklat na iniayon sa mga pamantayan ng kurikulum ng Baitang 2. Mula sa mga hamon sa matematika hanggang sa mga pagsasanay sa sining ng wika, maaaring tuklasin ng mga mag-aaral ang iba't ibang paksa sa isang kapana-panabik at nakaka-engganyong paraan. Nagtatampok ang kiosk ng mga makukulay na graphics, mga friendly na interface, at mga intuitive na kontrol, na ginagawang isang kasiya-siyang pakikipagsapalaran ang pag-aaral para sa bawat bata.",
    helper: "Mga Gumawa:",
    list: [
      "Software Developer: Gerick O. Recinto",
      "Hardware Creator: Chrystian Dominic Recio",
      "Designer and Music: Eduard C. Morete",
      "Contents Maker: Kaye Valenzuela",
    ],
  },
};

export default function AboutPage() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-16">
      <div className="flex items-center gap-8">
        <BackButton />
        <h1 className="text-3xl">About</h1>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="toggle"
          className="border-2 border-border"
          checked={toggle}
          onCheckedChange={() => setToggle((prev) => !prev)}
        />
        <Label className="text-xl" htmlFor="toggle">
          {toggle ? "Tagalog" : "English"}
        </Label>
      </div>
      <div className="flex max-w-[1000px] flex-col gap-8 rounded-md bg-white p-8">
        <p className="text-center">
          {(toggle ? texts.english : texts.tagalog).p1}
        </p>
        <p className="text-center">
          {(toggle ? texts.english : texts.tagalog).p2}
        </p>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold">
            {(toggle ? texts.english : texts.tagalog).helper}
          </h3>
          <ul className="list-disc">
            {(toggle ? texts.english : texts.tagalog).list.map(
              (item, index) => (
                <li
                  key={index}
                  className={cn(
                    item === "Contents Maker: Kaye Valenzuela" && "text-xs",
                  )}
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
