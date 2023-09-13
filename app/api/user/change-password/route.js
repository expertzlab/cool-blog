
import { NextResponse } from "next/server";

import path from "path";

import fs from "fs";

import * as jose from "jose";

import { comparePasswords, hashPassword } from '../../utils/password-util';
import CONSTANTS from "../../../../data/constants";

export async function POST (request) {

const requestBody = await request.json();

const { newPassword, oldPassword } = requestBody;
console.log('req:', requestBody)

// Get email from JWT cookie

const token = request.cookies.get('next-jwt')?.value;
console.log('Type:',typeof token)
if (!token) {
	return NextResponse.json(
	{
	status: CONSTANTS.RESPONSE_STATUS.ERROR,
	data: "Not authenticated",
	},
	{ status: 401}
	);
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const result = await jose.jwtVerify(token, secret);
const email = result.payload.email;

// Validate new password
if (!newPassword || newPassword.trim().length < 8) {
return NextResponse.json(
{
status: CONSTANTS.RESPONSE_STATUS.ERROR,
data: "Invalid new password! Minimum password length is 8."
},
{ status: 422}
);
}

// get all users

const filePath = path.join(process.cwd(), "data", "users.json");
const fileData = fs.readFileSync(filePath);
const data = JSON.parse(fileData);
console.log('data received:', data)

// Check if user existed
const user = data.find((u) => u.email === email);
console.log('user email alrady:', user.email)
if (!user) {
return NextResponse.json(
{
status: CONSTANTS.RESPONSE_STATUS.ERROR,
data: "Not found user",
},
{ status: 404}
);
}

// comparePasswords(plainText, hash)
//console.log('db password:', user.password)
//console.log('supplied old password', oldPassword)
const  isPasswordValid = await  comparePasswords(oldPassword, user.password);
if (! isPasswordValid) {
	return NextResponse.json(
	{
	status: CONSTANTS.RESPONSE_STATUS.ERROR,
	data: "Invalid old password",

	},
	{ status: 403}

	);
}

user.password = await hashPassword(newPassword);
fs.writeFileSync(filePath, JSON.stringify(data));

	return NextResponse.json(

	{
	status: CONSTANTS.RESPONSE_STATUS.OK,
	data: "Updated password successfully",
	},
	{ status: 201}
	);
}
