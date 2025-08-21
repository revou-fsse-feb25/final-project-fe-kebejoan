import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { UserRole } from "./types/tableTypes";

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const isAuthenticated = !!token;
	console.log("token: ", token);
	console.log("isAuthenticated: ", isAuthenticated);
	console.log("cookies: ", req.cookies.getAll());
	const path = req.nextUrl.pathname;
	const isAdmin = token?.role === UserRole.ADMIN;

	const isAuthPage = ["/login"].includes(path);
	const isProtectedPage = path.startsWith("/main");
	const isAdminPage = path.startsWith("/my-product"); //TODO: can define if there is an admin page

	if (isAuthenticated && isAuthPage) {
		return NextResponse.redirect(new URL("/main/dashboard", req.url));
	}

	if (isAuthenticated && isAdminPage && !isAdmin) {
		return NextResponse.redirect(new URL("/main/dashboard", req.url));
	}

	if (!isAuthenticated && isProtectedPage) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)).*)",
	],
};
