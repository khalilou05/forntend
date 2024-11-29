import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAuth } from "./lib/auth";

const baseUrl = "http://localhost:3000";
const protectedRoute = ["/admin"];

export default async function middmeware(request: NextRequest) {
  if (
    protectedRoute.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    ) &&
    !request.cookies.has("token")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    protectedRoute.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    ) &&
    request.cookies.has("token")
  ) {
    try {
      const { payload } = await isAuth(
        request.cookies.get("token")?.value || "",
      );
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (
    request.nextUrl.pathname.startsWith("/login") &&
    request.cookies.has("token")
  ) {
    try {
      const { payload } = await isAuth(
        request.cookies.get("token")?.value || "",
      );
      return NextResponse.redirect(new URL("/admin/orders", request.url));
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }
}
