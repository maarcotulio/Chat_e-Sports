import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {
  const isLogged = !!request.auth;
  const { pathname } = request.nextUrl;
  const isPublicPath = pathname.startsWith("/auth");

  if (!isLogged && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  if (isLogged && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
});

export const config = {
  matcher: ["/", "/auth/login", "/auth/register"],
};
