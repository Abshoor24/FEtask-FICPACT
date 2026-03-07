import { NextRequest, NextResponse } from "next/server";
import { authService } from "./data/services/authService";

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname
    const sessionCookie = request.cookies.get("token")?.value
    if (sessionCookie) {
        request.headers.set("Cookie", `token=${sessionCookie}`);
    }


    const session = await authService.checkSession(sessionCookie);
    // Handling route dashboard dan profile yang membutuhkan autentikasi
    if (pathName.startsWith("/dashboard") || pathName.startsWith("/profile")) {
        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
        if (!session.data.isVerified) {
            return NextResponse.redirect(new URL("/auth/verify", request.url));
        }
    }

    if (pathName.startsWith("/auth/verify")) {
        if (session?.data.isVerified && session.data.isVerified) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }


    return NextResponse.next();
}
