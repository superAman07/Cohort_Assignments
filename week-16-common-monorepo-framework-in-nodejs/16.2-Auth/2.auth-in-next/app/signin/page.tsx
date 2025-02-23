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