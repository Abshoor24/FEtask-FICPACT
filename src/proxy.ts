import { NextRequest, NextResponse } from "next/server";
import { authService } from "./data/services/authService";

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname
    const sessionCookie = request.cookies.get("token")?.value


    // Handling route register dan login
    // if (pathName.startsWith("/auth/register") || pathName.startsWith("/auth/login")) {
    //      const session = await authService.checkSession(sessionCookie);
    //     if (session) {
    //         return NextResponse.redirect(new URL("/", request.url));
    //     }
    // }

    // Handling route dashboard dan profile yang membutuhkan autentikasi
    if (pathName.startsWith("/dashboard") || pathName.startsWith("/profile")) {
        const session = await authService.checkSession(sessionCookie);
        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }


    return NextResponse.next();
}
