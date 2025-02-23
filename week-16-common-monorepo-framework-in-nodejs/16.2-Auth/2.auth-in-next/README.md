# Next auth me jo route.ts hai vo important hai...dekh lena..Aur neeche wale (3,4,5 important wale hai...har project me use honge...)

# https://projects.100xdevs.com/tracks/Next-Auth/next-auth-6   <-- important slide...


# 1 basic thing with DB (prisma let say in the below example)

import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";

const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name : "Email",
            credentials:{
                username: {label: 'username', type :'text', placeholder:'Email'},
                password: {label: 'password', type :'text', placeholder:'Password'}
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async authorize(credentials: any){
                const username = credentials.username;
                const password = credentials.password;
                const user = await prisma.user.findOne({
                //   basically aise hi auth ka use karke data ko db me add kar sakte hai...
                where : {
                    email : username,
                    password : password
                }
                })
                return {
                    id: user.id,
                    email: user.email
                }
                return {
                    id: "user1"
                }
            }
        })
    ]
})

export const GET = handler;
export const POST = handler;




# 2 take a good look at provider.tsx

and we cannot directly do inside the the root page (layout.tsx) but we can create a file (here providers.tsx) and then export it with the prop {children}  (===> we can also pass props like this <Provider>{props}</Provider> instead <Provider props= {props}/>)

here is the glimsp of prividers.tsx:-
'use client'
import { SessionProvider } from "next-auth/react"

export const Providers = ({children}:{
    children: React.ReactNode
})=>{
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

 
# 3 Most coolest thing...with auth is using inbuild fx in next

"use client"
import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation"

export default function Appbar(){
    // const route = useRouter();
    const session = useSession();
    return (
        <div>
            {/* <button onClick={()=>{
                route.push('/api/auth/signin') // normally to hum log ye karte hai....lakin in we should do this inbuild Signin/ Signout provided by next
            }}>Signin</button> */}
            <button onClick={()=>{signIn()}}>Signin</button>
            <button onClick={()=>{signOut()}}>LogOut</button>
            {JSON.stringify(session)} {/* <--- aise hum signIn krne k baad user ki details ko store kar sakte hai....aur kahi bhi use kar sakte hai*/}
        </div>
    )
}


# 4 abb ooper wale code se user to chalo login/signup ho gya aur uske credentials bhi stringify karke use kar liya...lakin server side agr zarurat hue unn credentials ki...tab (like inside app/user/page.tsx)
----> yaha hum use karte hai getServerSession ka from next-auth

"import { getServerSession } from "next-auth" 

export default async function User(){
    const getusercredential = getServerSession();
    return (
        <div>
            This is how we can get user s credentials
            {JSON.stringify(getusercredential)}
        </div>
    )
}" 

# 5 ye to gzb hi hai...jab bhi hum seever side me kaam karte waqt bhi agr zarurat ho to jaise 4 th wale  me kia hai vahi yaha bhi kar sakte hai.. like we did in api/user/route.ts

import { getServerSession } from "next-auth" 
import { NextResponse } from "next/server"
export function GET(){
    const session = getServerSession();
    return NextResponse.json(session)
}


# 6 isssue ye hai ki....abhi tak k steps se hum server side me user k credentials ka id (or sub) nhi access kar sakte the...
isko solve karne k liye...hame getServerSession() me NEXT_AUTH as a argument pass karna hoga... to isiliye hamne NEXT_AUTH ko alag se lib/auth.ts me bana liya...

import { getServerSession } from "next-auth" 
import { NEXT_AUTH } from "../lib/auth";

export default async function User(){
    const getusercredential = getServerSession(NEXT_AUTH);
    return (
        <div>
            This is how we can get user s credentials
            {JSON.stringify(getusercredential)}
        </div>
    )
} 


# 6 custum login page...

"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Signin() {
    const router = useRouter();
    
    return <div>
        <button onClick={async () => {
            await signIn("google");
        }}>Login with google</button>

        <br />
        <button onClick={async () => {
            await signIn("github");
        }}>Login with Github</button>
        <br />
        <button onClick={async () => {
            const res = await signIn("credentials", {
                username: "",
                password: "",
                redirect: false,
            });
            console.log(res);
            router.push("/")
        }}>Login with email</button>
        
    </div>
}

// Jab tum NextAuth.js ka signIn() function use karte ho, tab default behavior ye hota hai ki NextAuth apna khud ka sign-in page provide karta hai. Agar tum chahte ho ki custom sign-in page dikhe (jo tumne khud banaya ho), to pages object me signIn ka path define karna hota hai.