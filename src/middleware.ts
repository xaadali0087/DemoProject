import { getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = [
    "/checkout",
    "/favourites",
    "/my-account",
    "/my-orders",
  ];
  const publicPaths = [
    "/login",
    "/forgot-password",
    "/signup",
    "/code-verify",
    "/new-password",
  ];

  const isPathProtected = protectedPaths?.some((path) => pathname == path);

  const res = NextResponse.next();
  const token = await getToken({
    req,
    secret,
  });

  if (isPathProtected) {
    if (!token) {
      const url = new URL(`/login`, req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  } else {
    if (token) {
      const isPathPublic = publicPaths?.some((path) => pathname == path);
      if (isPathPublic) {
        const url = new URL(`/`, req.url);
        return NextResponse.redirect(url);
      }
    }
  }

  return res;
}
