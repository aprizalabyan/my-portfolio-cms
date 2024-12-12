import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const jwt_secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";

  if (req.nextUrl.pathname === "/login") {
    if (!token) {
      return NextResponse.next();
    }
    try {
      await jwtVerify(token, jwt_secret);
      return NextResponse.redirect(new URL("/", req.url));
    } catch (err) {
      console.log("Invalid token", err);
      return NextResponse.next();
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(token, jwt_secret);
    return NextResponse.next();
  } catch (err) {
    console.log("Invalid token", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/about-me", "/project-list", "/contact-info"],
};
