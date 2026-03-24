import { NextRequest, NextResponse } from "next/server";
import { authService } from "./data/services/authService";

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    // 1. EXTRA GUARD: Lewati middleware untuk file statis & internal Next.js
    // Ini kunci agar RAM tidak naik drastis
    if (
        pathName.startsWith("/_next") || 
        pathName.startsWith("/api") || 
        pathName.includes("favicon.ico") ||
        pathName.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js)$/)
    ) {
        return NextResponse.next();
    }

    const sessionCookie = request.cookies.get("token")?.value;

    // 2. Ambil session hanya jika token ada
    // Jika tidak ada token dan mau ke dashboard, langsung tendang tanpa panggil backend
    if (!sessionCookie && (pathName.startsWith("/dashboard") || pathName.startsWith("/profile") || pathName.startsWith("/auth/verify"))) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // 3. Cek session ke backend (Hono)
    const session = await authService.checkSession(sessionCookie);

    // --- LOGIC: DASHBOARD & PROFILE ---
    if (pathName.startsWith("/dashboard") || pathName.startsWith("/profile")) {
        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
        if (!session.data?.isVerified) {
            return NextResponse.redirect(new URL("/auth/verify", request.url));
        }
        if (!session.data?.isOnboarded) {
            return NextResponse.redirect(new URL("/onboarding", request.url));
        }
    }

    // --- LOGIC: VERIFY PAGE ---
    if (pathName.startsWith("/auth/verify")) {
        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
        if (session.data?.isVerified) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    // --- LOGIC: LOGIN/REGISTER PAGE (Auto Redirect if logged in) ---
    if (pathName.startsWith("/auth/login") || pathName.startsWith("/auth/register")) {
        if (session && session.data?.isVerified) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

// 4. CONFIG MATCHER: Filter request yang masuk ke middleware
export const config = {
    matcher: [
        /*
         * Jalankan middleware hanya untuk path:
         * - /dashboard, /profile, /auth, /onboarding
         * Hindari menjalankan middleware pada:
         * - api (api routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
