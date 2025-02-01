import type React from "react"
import { Plus, Search, Send } from "lucide-react"
import { Appbar } from "../components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish: React.FC = () => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const navigate = useNavigate();
  return (
    <div>
        <Appbar/>
        <div className="py-20">
        <div className="w-full mt-10 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
            <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors" aria-label="Add content">
                    <Plus className="w-6 h-6" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors" aria-label="Search">
                    <Search className="w-6 h-6" />
                </button>
                </div>
                <div className="space-y-4">
                <input
                    onChange={(e)=>{
                        setTitle(e.target.value);
                    }}
                    type="text"
                    placeholder="Title"
                    className="w-full border-0 p-0 text-4xl font-serif placeholder-gray-400 focus:outline-none focus:ring-0"
                />
                <textarea
                    onChange={(e)=>{
                        setDescription(e.target.value)
                    }}
                    placeholder="Tell your story..."
                    className="w-full border-0 p-0 text-xl placeholder-gray-400 resize-none min-h-[200px] focus:outline-none focus:ring-0"
                />
                </div>
                <button
                onClick={async()=>{
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content: description
                    },{
                        headers:{
                            Authorization: localStorage.getItem("token")
                        }
                    })
                    navigate(`/blog/${response.data.id}`)
                }}
                className="px-6 py-3 bg-green-600 cursor-pointer text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                aria-label="Publish post"
                >
                <span>Publish</span>
                <Send className="w-5 h-5" />
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}
 

