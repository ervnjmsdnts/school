export type Student = {
  id: string;
  name: string;
  nameInput: string;
  createdAt: number;
};

export type Lesson = {
  id: string;
  name: string;
  subject: "english" | "filipino" | "math";
  type: "1st" | "2nd" | "3rd" | "4th" | "advanced";
  fileName: string;
  url: string;
  createdAt: number;
};

export type Activity = {
  id: string;
  name: string;
  subject: "english" | "filipino" | "math";
  type: "1st" | "2nd" | "3rd" | "4th";
  createdAt: number;
  questions: {
    imageUrl: string | null;
    imageName: string | null;
    question: string;
    options: string[];
    answer: number;
  }[];
};

export type LessonInfo = Omit<Lesson, "url" | "fileName" | "subject" | "type">;

export type Score = {
  id: string;
  studentName: string;
  quizName: string;
  score: number;
  subject: "english" | "filipino" | "math";
  type: "1st" | "2nd" | "3rd" | "4th";
  createdAt: number;
};
