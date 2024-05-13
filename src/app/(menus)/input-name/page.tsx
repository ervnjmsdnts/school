"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
});

type FormData = z.infer<typeof schema>;

export default function InputNamePage() {
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    setOpenDialog(true);
  }, []);

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const name = data.name.split(" ").join("").toLowerCase();
    const res = await fetch("/api/login", {
      body: JSON.stringify({ name }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData: { message: string } = await res.json();

    if (res.status !== 200) {
      return toast.error(resData.message);
    }

    return router.push("/main-menu");
  };

  return (
    <>
      <Dialog onOpenChange={() => setOpenDialog(false)} open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Kamusta! mga Bata!</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 items-center">
            <div className="relative flex h-64 w-56">
              <Image src="/boy-talk.gif" alt="boytalk" objectFit="cover" fill />
            </div>
            <div className="grid gap-2">
              <p className="text-lg font-bold">Ito ang S.M.A.R.T.</p>
              <p>Ang Student Mastery and Academic Resource Terminal</p>
              <p>
                Nilikha ito upang ikaw ay matuto sa mga subject na Matematika,
                Ingles at Filipino.
              </p>
              <p>
                Kaya ano pa ang iyong hinihintay? Ilagay mo na ang iyong
                pangalan upang tayo ay makapag simula na.
              </p>
              <DialogClose asChild>
                <Button type="button" className="text-lg">
                  Start!
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="h-full">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full flex-col items-center justify-center gap-4"
        >
          <div className="grid gap-2">
            <Input
              {...form.register("name")}
              className="max-w-64 p-4 text-xl"
              placeholder="Input name..."
            />
            {form.formState.errors.name?.message && (
              <span className="text-sm text-red-700">
                {form.formState.errors.name.message}
              </span>
            )}
          </div>
          <Button
            className="border-2 border-border text-xl hover:animate-pulse"
            size="lg"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
