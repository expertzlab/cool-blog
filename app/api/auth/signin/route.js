
import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import path from "path";

import fs from "fs";

import * as jose from "jose";

import { comparePasswords } from '../../utils/password-util';
import CONSTANTS from '../../../../data/constants';

export async function POST (request) {
const requestBody = await request.json();

const { email, password } = requestBody;

// connect db and get all users
const filePath = path.join(process.cwd(), "data", "users.json");
const fileData = fs.readFileSync(filePath);

const data = JSON.parse(fileData);

// Check if user's email is valid
const user = data.find((u) => {
    if(u.email === email)
     return true
    else{
        console.log(u.email,':', email)
        return false;
    }
    
});
if (!user) {
return NextResponse.json({ status: CONSTANTS.RESPONSE_STATUS.ERROR,
data: "Invalid email or password 1"}, { status: 401 });
}
// Check if user's password is valid
const isPasswordValid = await comparePasswords(password, user.password);
if (!isPasswordValid) {
return NextResponse.json({ status: CONSTANTS.RESPONSE_STATUS.ERROR,
data: "Invalid email or password 2" }, { status: 401 });

}

// Create JWT

const alg = "HS256";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const token = await new jose.SignJWT({ email: user.email, role:
user.role }).setProtectedHeader({ alg }).setExpirationTime("48h").sign(secret);

// Store the JWT in cookie
cookies().set("next-jwt", token, {

maxAge: 60* 60 *24 * 2,//2 days
});

user.password = undefined;
return NextResponse.json({
    status: CONSTANTS.RESPONSE_STATUS.OK,
    data: {
    user,
    },
});
}


