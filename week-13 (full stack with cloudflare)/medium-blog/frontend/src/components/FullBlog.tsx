import { Blog } from "../hooks"
import { Appbar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}:{blog: Blog})=>{
    return (
        <div>
            <Appbar/>
            <div className="flex justify-center px-20 py-20">
                <div className="grid grid-cols-12 pt-12 px-10 w-full max-w-screen-xl">
                    <div className="col-span-8 ">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 py-2">
                            Post on {Date().slice(0,15)}
                        </div>
                        <div className="pt-2.5 break-words overflow-hidden w-full max-w-full text-justify">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-500 text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name = {blog.author.name || "Anonynous"}/>
                            </div>
                            <div className="">
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="text-slate-500">
                                    Random catch phrase about the author's ability to grab the user's attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}