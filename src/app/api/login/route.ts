import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name }: { name: string } = await request.json();
    const ref = collection(db, "students");
    const q = query(ref, where("nameInput", "==", name));
    const studentQuery = await getDocs(q);
    if (studentQuery.empty)
      return NextResponse.json(
        { message: "Student does not exist" },
        { status: 404 },
      );
    const student = studentQuery.docs.map((d) => d.data())[0];
    const data = {
      ...student,
      session: new Date().getTime() + 30 * 60 * 1000,
    };
    cookies().set("student", JSON.stringify(data), { maxAge: 30 * 60 * 1000 });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
