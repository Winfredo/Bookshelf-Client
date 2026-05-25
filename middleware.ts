import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;
  const path = request.nextUrl.pathname;

  // if trying to access dashboard without token — redirect to login
  if (path.startsWith("/dashboard") && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if student tries to access librarian dashboard
  if (path.startsWith("/dashboard/librarian") && userRole !== "librarian") {
    return NextResponse.redirect(new URL("/dashboard/student", request.url));
  }

  // if librarian tries to access student dashboard
  if (path.startsWith("/dashboard/student") && userRole !== "student") {
    return NextResponse.redirect(new URL("/dashboard/librarian", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};