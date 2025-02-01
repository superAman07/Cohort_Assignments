import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@superaman/medium-blog";

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string
      JWT_SECRET: string
    }
}>();

userRouter.post('/signup',async (c) => {
    const body  = await c.req.json(); 
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const {success } = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct while signup"
        })
    }
    try{
        const user = await prisma.user.create({
        data: {
            username: body.username,
            password: body.password,
            name: body.name
        }
        })
        const jwt = await sign({
            id: user.id
        },c.env.JWT_SECRET)
        return c.text(jwt);
    }catch(e:any){
        c.status(411);
        return c.json({ error: "Invalid Credential", details: e.message });
    }
})
userRouter.post('/signin', async (c) => {    
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const {success} = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct while singin"
        })
    }
    try{
        const user = await prisma.user.findFirst({
            where:{
                username: body.username,
                password: body.password
            }
        })
        if(!user){
            c.status(403);
            return c.json({
                message:"Invalid credentials"
            })
        }
        const jwt = await sign({
            id: user.id
        },c.env.JWT_SECRET)
        return c.text(jwt);
    }catch(e:any){
        c.status(411);
        return c.json({ error: "Invalid Credential", details: e.message });
    }
})