import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token_electrode")?.value;

    const protectedRoutes = ["/", "/profile", "/game"]; 
    const currentPath = req.nextUrl.pathname;

    if (protectedRoutes.includes(currentPath) && !token) {
        const loginUrl = new URL("/login", req.url);
        console.log("not logged in")
        return NextResponse.redirect(loginUrl);
    }

    if (currentPath === "/login" && token) {
        const homeUrl = new URL("/", req.url);
        console.log("logged in")
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

// Specify the routes for which the middleware should run
export const config = {
    matcher: ["/:path*", "/profile/:path*", "/login"], 
};
