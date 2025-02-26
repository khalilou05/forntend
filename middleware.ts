import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAuth } from "./lib/auth";

const protectedRoute = ["/admin"];

export default async function middmeware(request: NextRequest) {
  // if (
  //   request.nextUrl.pathname.startsWith("/admin")
  //   request.headers.get("Authorization") == ""
  // ) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
}
