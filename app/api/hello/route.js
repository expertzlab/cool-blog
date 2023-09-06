import { NextResponse } from "next/server"; 
import fs from 'fs'
import path from 'path'

export function GET() {
    const filePath = path.join(process.cwd(), "data", "users.json");
    fs.writeFileSync(filePath, JSON.stringify({'name':'john smith'}))  
    return NextResponse.json({ name: "John Smith" });

 }
