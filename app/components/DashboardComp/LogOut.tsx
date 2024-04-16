"use client"

import { useSetRecoilState } from "recoil";
import { IsLogAtom } from "../atoms/atom";
import { redirect } from "next/navigation";

const LogOut = ()=>{
    const Logged = useSetRecoilState(IsLogAtom);
    
    const LogOutFunction = ()=>{
        const value = confirm("Are you sure You want to Log Out");
        if(value === false){
            return;
        }
        localStorage.removeItem("token");
        Logged(null);
        // navigate("/signup")
        redirect("/signup")
    }
    return(
        <>
           <div className="flex justify-end px-8 py-4">
             <button className="bg-red-500 p-2 px-4 rounded-lg text-white" onClick={()=>{LogOutFunction()}}>LogOut</button>
           </div>
        </>
    )
}

export default LogOut;