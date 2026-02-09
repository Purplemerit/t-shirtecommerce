import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Example logic for protected routes
    // In a real app, you would check for a session cookie here.
    // Since we rely on localStorage in this client-side demo, we'll allow routes
    // but we can add a simple header check or just focus on preventing obvious issues.

    // For this project, if we want to be "perfect", we need session-based auth.
    // But since we are using client-side context + localStorage for simulation:

    // 1. Protection for Admin Routes
    // Strictly speaking, middleware can't read localStorage. 
    // We'd need to set a cookie on login.

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
