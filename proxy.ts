import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Vercel cron jobs to hit API routes without a cookie
  if (
    pathname.startsWith("/api/admin") &&
    request.headers.get("x-vercel-cron") === "1"
  ) {
    return NextResponse.next();
  }

  // These routes handle their own auth
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/auth"
  ) {
    return NextResponse.next();
  }

  // Protect all /admin/* pages and /api/admin/* endpoints
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const cookie = request.cookies.get("admin_auth");
    const isAuthenticated =
      cookie && cookie.value === process.env.ADMIN_SECRET;

    if (!isAuthenticated) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
