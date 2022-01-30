import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest, ev: NextResponse) {
  const { pathname } = req.nextUrl;
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/summaries", req.url));
  }
  return NextResponse.next();
}
