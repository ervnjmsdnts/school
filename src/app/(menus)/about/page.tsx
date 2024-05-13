"use client";
import BackButton from "@/components/back-button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useState } from "react";

const texts = {
  english: {
    p1: "The Student Mastery and Academic Resource Terminal (S.M.A.R.T.) is created for students in Grade 2 of Marawoy Elementary School. It will be your partner in learning your subjects in English, Mathematics, and Filipino. It was developed to support and improve the educational journey of young learners. Our kiosk blends fun and education by offering various interactive activities and tools to help students understand academic skills while enjoying themselves.",
    p2: "S.M.A.R.T. provides educational activities and quizzes, enriching videos, and modules aligned with Grade 2 curriculum standards. Starting from Math challenges to English and Filipino exercises, students can explore different topics in an exciting and engaging manner. The kiosk features colorful graphics, a friendly interface, and easy-to-use controls, all combined to create a platform that makes learning and education more enjoyable for every child using the kiosk.",
    helper: "Creators:",
    list: [
      "Software Developer: Gerick O. Recinto",
      "Hardware Creator: Chrystian Dominic Recio",
      "Designer and Music: Eduard C. Morete",
      "Contents: Kaye Valenzuela",
    ],
  },
  tagalog: {
    p1: "Ang Student Mastery and Academic Resource Terminal (S.M.A.R.T.) ay nilikha para sa mga mag-aaral sa Baitang 2 ng Marawoy Elementary School. Ito ang inyong magiging katuwang sa pag-aaral ng inyong mga asignatura na Ingles, Matimatika at Filipino. Ito ay binuo upang suportahan at mapabuti ang paglalakbay sa edukasyon ng mga batang mag-aaral. Ang aming kiosk ay pinagsama ang saya at edukasyon na nag-aalok ng ibat ibang interactive na mga gawain at kasangkapan upang matulungan ang mga mag-aaral na maunawaan ang mga akademikong kasanayan habang nag-eenjoy.",
    p2: "Ang S.M.A.R.T. ay nagbibigay ng mga aktibidad at pang-edukasyon na pagsusulit, mga may kapupulutang aral na videos at modules na iniayon sa mga pamantayan ng kurikulum ng Baitang 2. Mula sa mga hamon sa matematika hanggang sa mga pagsasanay sa Ingles at Filipino, maaaring tuklasin ng mga mag-aaral ang iba't ibang paksa sa isang kapana-panabik at nakakaengganyong paraan. Ang kiosk ay may mga makukulay na grapika, magiliw na interface, at madaling gamitin na mga kontrol, na pinagsama-sama upang makagawa ng isang platform mas maging masaya ang pag-aaral at pagkatuto ng bawat bata na gumagamit ng kiosk.",
    helper: "Mga Gumawa:",
    list: [
      "Software Developer: Gerick O. Recinto",
      "Hardware Creator: Chrystian Dominic F. Recio",
      "Designer and Music: Eduard C. Morete",
      "Contents: Kaye D. Valenzuela",
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
          {toggle ? "English" : "Tagalog"}
        </Label>
      </div>
      <div className="flex max-w-[1000px] flex-col gap-8 rounded-md bg-white p-8">
        <p className="text-xl">{(toggle ? texts.english : texts.tagalog).p1}</p>
        <p className="text-xl">{(toggle ? texts.english : texts.tagalog).p2}</p>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">
            {(toggle ? texts.english : texts.tagalog).helper}
          </h3>
          <ul className="list-disc">
            {(toggle ? texts.english : texts.tagalog).list.map(
              (item, index) => (
                <li key={index} className={cn("text-2xl")}>
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
