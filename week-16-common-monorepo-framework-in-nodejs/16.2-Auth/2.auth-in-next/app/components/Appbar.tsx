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