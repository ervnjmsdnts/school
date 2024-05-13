"use client";

import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

interface TimeLeft {
  minutes: string | number;
  seconds: string | number;
}

export default function Timer() {
  const cookies = useCookies();
  const student = cookies.get("student");
  const { session: timestamp }: { session: number } = JSON.parse(
    student ?? "{}",
  );

  const calculateTimeLeft = (): TimeLeft | {} => {
    const difference = timestamp - Date.now();
    let timeLeft = {};

    if (difference > 0) {
      const minutes = Math.floor(difference / (1000 * 60));
      const seconds = Math.floor((difference / 1000) % 60);
      timeLeft = {
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      const value = calculateTimeLeft();
      setTimeLeft(value);

      if (typeof value === "object" && Object.keys(value).length === 0) {
        clearInterval(timer);
        cookies.remove("student");
        router.push("/");
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-lg bg-amber-800 p-2 text-xl text-white">
      <span>Session: </span>
      {typeof timeLeft === "object" && Object.keys(timeLeft).length > 0 ? (
        <span>
          {(timeLeft as TimeLeft).minutes}:{(timeLeft as TimeLeft).seconds}
        </span>
      ) : (
        <span>Timer expired</span>
      )}
    </div>
  );
}
