import Link from "next/link";

export default function InputNamePage() {
  return (
    <div className="h-full">
      <form className="flex h-full flex-col items-center justify-center gap-4">
        <input
          className="form-input rounded-lg border-2 border-amber-600 p-6 text-lg focus:border-amber-800 focus:outline-none focus:ring-0"
          placeholder="Enter your name..."
        />
        <Link
          href="/main-menu"
          className="rounded-lg border-2 border-amber-800 bg-amber-600 px-8 py-4 text-xl font-bold text-white"
        >
          Submit
        </Link>
      </form>
    </div>
  );
}
