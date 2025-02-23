import CredentialsProvider  from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const NEXT_AUTH={
    providers:[
        CredentialsProvider({
            name : "Email",
            credentials:{
                username: {label: 'Username', type :'text', placeholder:'Email'},
                password: {label: 'Password', type :'password', placeholder:'Password'}
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
            async authorize(credentials: any){
                console.log(credentials)
                // const username = credentials.username;
                // const password = credentials.password;
                // const user = await prisma.user.findOne({
                //   basically aise hi auth ka use karke data ko db me add kar sakte hai...
                // where : {
                //     email : username,
                //     password : password
                // }
                // })
                //validation stufss
                return {
                    id: "user",
                    name:"aman",
                    email: "aman@gmail.com",
                }
                // return {
                //     id: "user1"
                // }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID ||"",
            clientSecret: process.env.GITHUB_SECRET||""
        })
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session: ({session,token}: any)=>{
            console.log(session)
            if(session && session.user){
                session.user.id = token.sub;
            }
            return session
        }
    },
    pages:{
        signIn: '/signin'
    }
}

// Jab tum NextAuth.js ka signIn() function use karte ho, tab default behavior ye hota hai ki NextAuth apna khud ka sign-in page provide karta hai. Agar tum chahte ho ki custom sign-in page dikhe (jo tumne khud banaya ho), to pages object me signIn ka path define karna hota hai.