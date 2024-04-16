"use client"
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IsLogAtom } from "../atoms/atom";
import axios from "axios";
import { toast } from "react-custom-alert";
import Link from "next/link";


const Formcomp = () => {
    const { register, handleSubmit } = useForm();
    const setUser = useSetRecoilState(IsLogAtom);
    const value = useRecoilValue(IsLogAtom);
    const router = useRouter()
    // if(value != null||undefined){
    //     router.push("http://localhost:3000/dashboard")
    // }
    
    
    const onsubmit = async (e: any) => {
    
        try {
            // e.preventDefault();
            const token = await axios.post("http://localhost:3000/api/user/signin", { params: { username: e.username, password: e.password } });
            let Ourtoken = "Bearer " + token.data.token;
            console.log(Ourtoken);
            
            localStorage.setItem("token", String("Bearer " + token.data.token));
            console.log(localStorage.getItem("token"));
            
            const User = await axios.get("http://localhost:3000/api/user/IsValidToken", { headers: { Authorization: Ourtoken } });
            console.log("Control reached before SetuSER");
            console.log(User);
            
            setUser(User);
            // <Navigate to="/dashboard" />
            console.log("Control reached AFTER SetuSER");
            console.log(value);
            if(User){
                
            }
            
            // const router = useRouter()
            // e.preventDefault()
            // router.prefetch("http://localhost:3000/dashboard")
            // // console.log("Control reached AFTER Push command");
            // // redirect("http://localhost:3000/dashboard")
            // console.log(value);

        } catch (error: any) {

            toast.error(error)
            //  alert(error.response.data.message)
        }
          
        router.push("http://localhost:3000/dashboard")
        
    }


    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <div className="py-2">
                <div className="py-1">
                    <label className="font-medium">
                        Email
                    </label>
                </div>
                <div className=" py-1">
                    <input type="email" placeholder="jhondoe@example.com" className="p-2 w-full border border-slate-300 rounded-lg" required minLength={3} maxLength={30} {...register("username")} />
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
                    Sign In
                </button>
            </div>
            <div className="text-center py-1">
                Don't have an Account? <Link className="underline" href="/signup">Sign Up</Link>
            </div>
        </form>
    )
}

export default Formcomp