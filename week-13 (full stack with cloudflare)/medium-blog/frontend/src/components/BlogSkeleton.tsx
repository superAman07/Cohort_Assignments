import { Circle } from "./BlogCard"

export const BlogSkeleton = ()=>{
    return (
        <div role="status" className=" animate-pulse">
            <div className="border-b border-slate-300 pb-3 p-4 w-screen cursor-pointer max-w-screen-md">
                <div className="flex">
                    <div className="h-4 bg-gray-300 rounded-full w-48 mb-4"></div>
                    <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                        <div className="h-2 bg-gray-300 rounded-full max-w-[360px] mb-2.5"></div>
                        <div className="h-2 bg-gray-300 rounded-full max-w-[360px] mb-2.5"></div>
                    </div>
                    <div className="flex justify-center pl-2 flex-col">
                        <Circle/>
                    </div> 
                    <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                        <div className="h-2 bg-gray-300 rounded-full mb-2.5"></div>
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">
                    <div className="h-2 bg-gray-300 rounded-full mb-2.5"></div>
                </div>
                <div className="text-md font-thin">
                    <div className="h-2 bg-gray-300 rounded-full mb-2.5"></div>
                </div>
                <div className="text-slate-500 text-sm font-thin pt-3">
                    <div className="h-2 bg-gray-300 rounded-full mb-2.5"></div>
                </div> 
            </div> 
            <span className="sr-only">Loading...</span>
        </div>
    )
}