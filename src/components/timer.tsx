"use client";

import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

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

  const [timeLeft, setTimeLeft] = useState<TimeLeft | {}>({});
  const [initialized, setInitialized] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!initialized) {
      setTimeLeft(calculateTimeLeft());
      setInitialized(true);
    }

    const timer = setInterval(() => {
      const value = calculateTimeLeft();
      setTimeLeft(value);

      if (typeof value === "object" && Object.keys(value).length === 0) {
        clearInterval(timer);
        setOpenDialog(true);
        // cookies.remove("student");
        // router.push("/");
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  const handleMainMenu = () => {
    cookies.remove("student");
    setOpenDialog(false);
    router.push("/");
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={handleMainMenu}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">
              Thank you for using S.M.A.R.T.
            </DialogTitle>
            <DialogDescription className="text-base">
              Sad to say but your session has ended
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="text-lg" onClick={handleMainMenu}>
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="relative z-10 flex items-center gap-2 rounded-lg bg-amber-800 p-2 text-xl text-white">
        <p>Session: </p>
        {typeof timeLeft === "object" && Object.keys(timeLeft).length > 0 ? (
          <p>
            {(timeLeft as TimeLeft).minutes}:{(timeLeft as TimeLeft).seconds}
          </p>
        ) : (
          <p>Timer expired</p>
        )}
      </div>
    </>
  );
}
