"use client"

import {atom,atomFamily,selector} from "recoil"
import axios from "axios"
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";


// Input user Atom
export const InputUserAtom = atom({
        key:"InputUserAtom",
        default: ""
})

export const UserSelector = selector({
    key:"UserSelector",
    get : async({get})=>{
        const input = get(InputUserAtom);
        console.log("Trying to fetch");
        // const user = await axios.get("http://localhost:3000/api/user/bulk",{params:{firstName:input,lastName:input}});
        const user = await axios.post("http://localhost:3000/api/user/bulk",{params:{firstName:input,lastName:input}});

        // console.log(user);
        const Me = get(IsLogAtom);
        const final  = user.data.users.filter((usere:any)=>{

            return usere.id !== Me?.data.user.id
        })

        return final;
    }
})
// If Person present atom
export const IsLogAtom = atom({
    key:"IsLogAtom",
    default: selector({
        key:"IsLogAtomSelector",
        get:async()=>{
            const router = useRouter();
            // const token = localStorage.getItem("token");
            let token;
            if(typeof window !== 'undefined'){
            token = localStorage.getItem("token");
            
            if(token === null){
                return null;
            }else{
                const User = await axios.get("http://localhost:3000/api/user/IsValidToken",{headers:{Authorization:token}});
                // router.push("http://localhost:3000/dashboard");
                console.log(User);
                
                return User;
                // redirect("/dashboard");
                
            }
        }
        }
    })
})
// Amount Selector
export const TellAmount = atom({
    key:"TellAmount",
    default:selector({
        key:"TellAmountSelector",
        get:async()=>{
            if(typeof window !== 'undefined'){
            const token = localStorage.getItem("token");
            const amount = await axios.get("http://localhost:3000/api/account/balance",{headers:{Authorization:token}});
    
            return amount;
            }
        }
    })
    
})
//  Modal Atom
export const ModalState = atomFamily({
    key:"ModalState",
    default:false,
})