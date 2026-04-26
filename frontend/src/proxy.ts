import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/login", "/register", "/blogs", "/tutors"];
const privatePaths = ["/admin-dashboard", "/student-dashboard", "/tutor-dashboard"];

const sessionCookieNames = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
  "session_token",
  "__Secure-session_token",
];

function isMatchingPath(pathname: string, paths: string[]) {
  return paths.some((path) => pathname === path || pathname.startsWith(path + "/"));
}

function hasSessionToken(request: NextRequest) {
  return sessionCookieNames.some((cookieName) => request.cookies.has(cookieName));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ======================= VERIFY SESSION =======================
  const hasToken = hasSessionToken(request);

  // ======================= CHECK PATHS & GIVE PERMISSIONS =======================
  const isPublicPath = isMatchingPath(pathname, publicPaths);
  const isPrivatePath = isMatchingPath(pathname, privatePaths);

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (isPrivatePath && !hasToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
