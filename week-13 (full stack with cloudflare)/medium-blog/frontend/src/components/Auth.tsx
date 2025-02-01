import { SignupInput } from "@superaman/medium-blog";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type:"Signin"|"Signup"})=>{
    const navigate = useNavigate()
    const [postInput, setPostInput] = useState<SignupInput>({      // <-------- fancy way instead using multiple useStates 
        name: "",
        username: "",
        password: ""
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "Signup"?"signup":"signin"}`,postInput);
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate('/blogs')
        }catch(e){
            alert(`While signup${e}`);
        }
    }
    return (
        <div className="h-screen flex justify-center items-center flex-col">  
            <div>
                <div className="mb-2 px-10 ">
                    <div className="text-3xl font-extrabold  ">
                        Create an account
                    </div>
                    <div className="max-w-lg text-slate-500 text-center">
                        {type === "Signup"?"Already have an account ?":"Don't have an account"} <Link to={type==="Signup"?'/signin':'/signup'} className="text-blue-500 underline">{type === "Signup"? "Login": "Signup"}</Link> 
                    </div>
                </div>
                <div className="pt-2">
                    {type === "Signup"?
                        <LabelledInput label="Name" placeholder="Enter your name" onChange={(e)=>{setPostInput({
                            ...postInput,
                            name: e.target.value
                        })}}/>
                    :null}
                    <LabelledInput label="Username" placeholder="example@gmail.com" onChange={(e)=>{setPostInput({
                        ...postInput,
                        username: e.target.value
                    })}}/>
                    <LabelledInput label="Password" type="password" placeholder="password" onChange={(e)=>{setPostInput({
                        ...postInput,
                        password: e.target.value
                    })}}/>
                    <button type="button" onClick={sendRequest} className="text-white w-full mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=="Signup"?"Sign up" : "Sign in"}</button>

                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label : string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    type?: string;
}

function LabelledInput ({label, placeholder, onChange, type}:LabelledInputType){
    return ( 
        <div>
            <label className="block mb-2 mt-2 text-sm font-semibold text-gray-900">{label}</label>
            <input onChange={onChange} type={type || ""} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    )
}