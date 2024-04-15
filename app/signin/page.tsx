"use client"
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
// import { IsLogAtom } from "../atoms/atom";
import { IsLogAtom } from "../components/atoms/atom";
import axios from "axios";
import { toast } from "react-custom-alert";
import Link from "next/link";



const Signin = () => {

    const { register, handleSubmit } = useForm();
    const setUser = useSetRecoilState(IsLogAtom);
    const onsubmit = async (e: any) => {

        try {
            const token = await axios.post("http://localhost:3000/api/user/signin", { params: { username: e.username, password: e.password } });
            let Ourtoken = "Bearer " + token.data.token;
            localStorage.setItem("token", ("Bearer " + token.data.token));
            const User = await axios.get("http://localhost:3000/api/user/IsValidToken", { headers: { Authorization: Ourtoken } });

            setUser(User);
            // <Navigate to="/dashboard" />
            redirect("/dashboard")
        } catch (error: any) {

            toast.error(error)
            //  alert(error.response.data.message)
        }



    }
    return (
        <>
            <div className="bg-[#7f7f7f] h-screen ">
                <div className="flex justify-center items-center h-full">
                    <div className="bg-white p-8 rounded-lg ">
                        <div className="flex justify-center text-3xl font-bold">
                            Sign In
                        </div>
                        <div className="flex justify-center text-gray-500 py-4 text-center pb-8 px-8">
                            Enter your Credentials to Access your <br />
                            account
                        </div>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin;