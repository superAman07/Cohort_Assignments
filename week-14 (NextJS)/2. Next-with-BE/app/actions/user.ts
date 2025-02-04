"use server"
import prisma from "@/db";
export async function Solve(username:string , password: string){
    try{
        await prisma.user.create({
            data: {
                email:  username,
                password: password
            }
        })
        return true;
    }catch(e:unknown){
        return false;
    }
}