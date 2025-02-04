//  this api folder can be delete it is useless now as slide 12th (https://projects.100xdevs.com/tracks/nextjs-2/next-2-12 )  says ... we can shift all to actions(name not mendatory) folder

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
export async function POST(req: NextRequest){
    // body
    // const prisma = new PrismaClient();
    try{
        const body = await req.json();
        const data = await prisma.user.create({
            data: {
                email: body.username,
                password: body.password
            }
        })
        // headers
        // console.log(req.headers.get("authorization"));
        // // query params
        // console.log(req.nextUrl.searchParams.get("name"));

        return NextResponse.json({
            data,
            message:"You are logged in"
        })
    }catch(e){
        return NextResponse.json({
            message:`Error while sign up..${e}`
        })
    }
}