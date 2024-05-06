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
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, getDocs, query, where } from "firebase/firestore";
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
    try {
      const ref = collection(db, "students");
      const q = query(ref, where("nameInput", "==", name));
      const studentQuery = await getDocs(q);
      if (studentQuery.empty) return toast.error("Student does not exist");
      const student = studentQuery.docs.map((d) => d.data())[0];
      localStorage.setItem("student", JSON.stringify(student));

      router.push("/main-menu");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Dialog onOpenChange={() => setOpenDialog(false)} open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kamusta! mga Bata!</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 items-center">
            <div className="relative flex h-64 w-56">
              <Image src="/boy-talk.gif" alt="boytalk" objectFit="cover" fill />
            </div>
            <div className="grid gap-2">
              <p className="text-lg font-bold">Ito ang S.M.A.R.T.</p>
              <p className="text-sm">
                The Student Mastery and Academic Resource Terminal
              </p>
              <p className="text-sm">
                Ginawa ito upang kayo ay matuto sa inyong mga subjects na
                Matematika, Engles at Filipino.
              </p>
              <p className="text-sm">
                Ano pa ang inyong hinihintay Ilagay nyo na ang Inyong mga
                pangalan at tayo ay magsimula na.
              </p>
              <DialogClose asChild>
                <Button type="button">Start!</Button>
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
