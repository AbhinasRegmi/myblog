import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";
import {
    publicRoutes,
    adminRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT
} from "@/routes";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isAdmin = req.auth?.user?.role === "ADMIN";

    console.log(req.auth)


    const isApiAuthPrefixRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

    if (isApiAuthPrefixRoute) {
        return NextResponse.next();
    }

    if (isAdminRoute && !isAdmin) {
        return NextResponse.rewrite(
            new URL("/not-found", req.url)
        );
    }


    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(
            new URL(`/auth/login?next=${nextUrl.pathname}`, req.url)
        )
    }

    return NextResponse.next();

})


export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/(api|trpc)(.*)"
    ]
};