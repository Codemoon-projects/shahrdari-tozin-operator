import { NextRequest, NextResponse } from "next/server";

// Define which routes should be protected
const PUBLIC_ROUTES = ["/login"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const path = req.nextUrl.pathname;

  // Allow access to public routes regardless of auth status
  if (PUBLIC_ROUTES.includes(path)) {
    return NextResponse.next();
  }

  // If on a protected route and no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If on login page with token, redirect to dashboard
  if (path === "/login" && token) {
    return NextResponse.redirect(new URL("/Dashboard", req.url));
  }

  // Otherwise, allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
