import Image from "next/image";
import { redirect } from "next/navigation";
import { useRecoilValue } from "recoil";
import { IsLogAtom } from "./components/atoms/atom";


export default function Home() {
    const IsUser = useRecoilValue(IsLogAtom);
    if(IsUser === null){
        redirect("/signup")
    }else{
        redirect("/dashboard")
    }
   
    // return 
}
