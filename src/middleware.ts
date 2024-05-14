import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const PUBLIC_PATHS = ["/", "/input-name"];

  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const studentCookie = request.cookies.get("student");
  if (!studentCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const studentData = JSON.parse(studentCookie.value);

  if (new Date().getTime() > studentData.session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|favicon.ico).*)"],
};
