import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-300 pb-3 p-4 w-full cursor-pointer max-w-screen-md">
        <div className="flex flex-wrap items-center">
          <Avatar size="small" name={authorName} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">
          {content.length > 100 ? `${content.slice(0, 100)}...` : content}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-3">
          {Math.ceil(content.length / 100)} minute(s) to read
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full md:w-full bg-slate-400"></div>;
}

export function Avatar({ name, size }: { name: string; size?: "big" | "small" }) {
  return (
    <div
      className={`relative inline-flex items-center cursor-pointer ${
        size === "small" ? "h-5 w-5" : "h-8 w-8"
      } justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span className={`${size === "small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}>
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
