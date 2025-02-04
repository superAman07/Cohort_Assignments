import prisma from "@/db";
async function getUserData(){
  const data = await prisma.user.findFirst() 
  return {
    email: data?.email,
    name: "Aman"
  } 
}
export default async function Home() {
  const user = await getUserData();
  return (
     <div>
      <div>{user.email}</div>
      <div>{user.name}</div> 
     </div>
  );
}


// https://projects.100xdevs.com/tracks/nextjs-2/next-2-11    <--- this is the most important thing and slide for next js to see how they work in production...(don't miss this) 