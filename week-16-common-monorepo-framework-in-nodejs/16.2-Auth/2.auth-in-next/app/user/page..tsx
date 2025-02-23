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