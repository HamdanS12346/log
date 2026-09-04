import { NextResponse } from "next/server";

export function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.headers.set("Clear-Site-Data", "\"storage\"");
  return response;
}
