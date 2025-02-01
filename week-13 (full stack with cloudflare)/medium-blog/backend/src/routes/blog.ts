import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@superaman/medium-blog";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings:{
       DATABASE_URL: string
       JWT_SECRET: string
    }, Variables :{
        userId: string
    }
}>();
blogRouter.use('/*', async (c,next)=>{
    const authHeader = c.req.header('authorization')||"";
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET)as {id:string};
        if(user){
            c.set("userId", user.id);
            await next();
        }else{
            c.status(403);
            return c.json({
                message: "You are not logging in!!"
            })   
        }
    }catch(e){
        c.status(403);
        return c.json({
            message: "You are not logging in!!"
        })  
    }
})

blogRouter.post('/',async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct while creating post"
        })
    }
    const authorId = c.get('userId');
    try{
        const blog  = prisma.blog.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        })
      return c.json({ id: (await blog).id })
    }catch(e){
        return c.text("Error while posting...")
    }
})

blogRouter.put('/',async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct while updating post"
        })
    }
    try{
        const blog  = await prisma.blog.update({
            where:{
                id: body.id
            },
            data:{
                title: body.title,
                content: body.content,
            }
        })
      return c.json({ id: blog.id })
    }catch(e){
        return c.text("Error while posting...")
    }
})
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());    
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select:{
                    name: true
                }
            }
        }
    })
    return c.json({blogs})
})
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const blog  = await prisma.blog.findFirst({
            where:{
                id: Number(id)
            },
            select : {
                id: true,
                content: true,
                title: true,
                author: {
                    select:{
                        name: true
                    }
                }
            }
        })
      return c.json({blog})
    }catch(e){
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        })
    }
})