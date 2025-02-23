import { NEXT_AUTH } from "@/app/lib/auth";
import NextAuth from "next-auth";
const handler = NextAuth(NEXT_AUTH)

export const GET = handler;
export const POST = handler;













// manually

// import { NextRequest, NextResponse } from "next/server";

// export function GET(req: NextRequest, {params:{authRoutes}}:{
//     params:{
//         authRoutes:string[]
//     }
// }){ 
//     console.log(authRoutes);
// // export function GET(req: NextRequest,args:any){  <---instead of above params style we can do this but above one is recommended
//     // console.log(args.params.authRoutes);
//     return NextResponse.json({
//         message: "this is from corrected route"
//     })
// }