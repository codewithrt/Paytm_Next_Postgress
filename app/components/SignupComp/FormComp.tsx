"use client"

import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IsLogAtom } from "../atoms/atom";
import { toast } from "react-custom-alert";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Formcomp = ()=>{
    const { register, handleSubmit } = useForm();
    const setUser = useSetRecoilState(IsLogAtom);
    const value = useRecoilValue(IsLogAtom)
    const router = useRouter()
    useEffect(()=>{
         if(value !== null||undefined){
            router.push("http://localhost:3000/dashboard")
         }
    },[value])
   
    const onsubmit = async (e: any) => {

        try {
            const token = await axios.post("http://localhost:3000/api/user/signup", { params: { username: e.email, password: e.password, firstName: e.firstName, lastName: e.lastName } });
            let Ourtoken = "Bearer " + token.data.token;
            localStorage.setItem("token", ("Bearer " + token.data.token));
            const User = await axios.get("http://localhost:3000/api/user/IsValidToken", { headers: { Authorization: Ourtoken } });

            setUser(User);
            // <Navigate to="/dashboard" />
            // redirect("/dashboard")
        } catch (error: any) {

            toast.error(error)
            //  alert(error.response.data.message)
        }
        router.push("http://localhost:3000/dashboard")
    }
    return(
        <form onSubmit={handleSubmit(onsubmit)}>
        <div className="py-2">
            <div className="py-1">
                <label className="font-medium">
                    First Name
                </label>
            </div>
            <div className=" py-1">
                <input placeholder="John" className="p-2 w-full border border-slate-300 rounded-lg" required maxLength={50} {...register("firstName")} />
            </div>
        </div>
        <div className="py-2">
            <div className="py-1">
                <label className="font-medium">
                    Last Name
                </label>
            </div>
            <div className=" py-1">
                <input placeholder="Doe" className="p-2 w-full border border-slate-300 rounded-lg" required maxLength={50} {...register("lastName")} />
            </div>
        </div>
        <div className="py-2">
            <div className="py-1">
                <label className="font-medium">
                    Email
                </label>
            </div>
            <div className=" py-1">
                <input type="email" placeholder="jhondoe@example.com" className="p-2 w-full border border-slate-300 rounded-lg" required minLength={3} maxLength={30} {...register("email")} />
            </div>
        </div>
        <div className="py-2">
            <div className="py-1">
                <label className="font-medium">
                    Password
                </label>
            </div>
            <div className=" py-1">
                <input type="password" placeholder="#password$" className="p-2 w-full border border-slate-300 rounded-lg" required minLength={6} {...register("password")} />
            </div>
        </div>
        <div className="py-2">
            <button className="text-center bg-black w-full text-white p-2 rounded-lg " type="submit">
                Sign Up
            </button>
        </div>
        <div className="text-center py-1">
            Already have an Account? <Link className="underline" href="/signin">Login</Link>
        </div>
    </form>
    )
}

export default Formcomp