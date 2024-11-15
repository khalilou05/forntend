import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export default function middmeware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.cookies.has("token")
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/login");
  } else if (
    request.nextUrl.pathname === "/login" &&
    request.cookies.has("token")
  ) {
    return NextResponse.redirect(request.nextUrl.origin + "/admin/orders");
  } else {
    return NextResponse.next();
  }
}
