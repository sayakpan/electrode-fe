import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;

    const protectedRoutes = ["/", "/profile", "/game"]; // Add all protected routes here
    const currentPath = req.nextUrl.pathname;

    // If the route is protected and no token exists, redirect to login
    if (protectedRoutes.includes(currentPath) && !token) {
        const loginUrl = new URL("/login", req.url);
        console.log("not logged in")
        return NextResponse.redirect(loginUrl);
    }

    // If logged in and trying to access login or register, redirect to dashboard
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
