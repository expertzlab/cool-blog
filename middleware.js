

import { NextResponse } from "next/server";

import * as jose from "jose";
import CONSTANTS from "./data/constants";

export async function middleware(request) {

const token = request.cookies.get("next-jwt")?.value;

if(request.nextUrl.pathname.startsWith('/api')){
    // API Guard

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        try {
            const result = await jose.jwtVerify(token, secret);
            console.log('role:api:', result.payload.role)
            if(request.nextUrl.pathname.startsWith('/api/admin') &&
                result.payload.role !== CONSTANTS.USER_ROLE.ADMIN){
                    return NextResponse.json({ status: CONSTANTS.RESPONSE_STATUS.ERROR,
                        data: "Forbidden"}, {status: 403});
            }

        } catch (error) {
        return NextResponse.json({ status: CONSTANTS.RESPONSE_STATUS.ERROR,
            data: "Forbidden"}, {status: 403});
        }

} else {

        // Page guard
        const url = request.nextUrl.origin +  "/login?callbackUrl=" +
        encodeURIComponent(request.nextUrl.pathname);
        if (!token) {
            console.log('token does not exists:page')
            return NextResponse.redirect(url);

        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        try {
            const result = await jose.jwtVerify(token, secret);
            console.log('role:page:', result.payload.role)
            if(request.nextUrl.pathname.startsWith('/admin') &&
                result.payload.role !== CONSTANTS.USER_ROLE.ADMIN){
                return NextResponse.redirect(request.nextUrl.origin+'/403');
	        }


        } catch (error) {
            console.log('error:', error)
            return NextResponse.redirect(url);
        }
        }

}


export const config = {
    matcher: ['/admin/:path*', '/user/:path*', '/api/admin/:path*', '/api/user/:path*',
                '/admin/post/:path*', '/api/admin/post/:path*'],
}
    