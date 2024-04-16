import dynamic from "next/dynamic";

import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { IsLogAtom } from "../atoms/atom";
import { useRouter } from "next/navigation";

const NameComp = dynamic(() => import('./NameComp'), { ssr: false })
const LogOut = dynamic(() => import('./LogOut'), { ssr: false })
const YourBalance = dynamic(() => import('./YourBalance'), { ssr: false })
const UserList = dynamic(() => import('./UserList'), { ssr: false })
const InputComp = dynamic(() => import('./InputComp'), { ssr: false })

const MainDashComp = () => {
    const User = useRecoilValue(IsLogAtom);
    const router = useRouter()
    if(User === null||undefined){
       router.push("http://localhost:3000/signup")
    }
    return (
        <>
            <div className="grid grid-cols-2 gap-4 place-content-end px-8 bg-white py-2 border-b-2 border-gray-200">

                <div className="p-2 font-bold text-xl">
                    Payments App
                </div>
                <div className="justify-end  flex">
                    <NameComp />
                </div>
            </div>
            <div className="bg-white grid grid-cols-2 place-content-end">
                <YourBalance />
                <LogOut />
            </div>
            <div>
                <div className="p-2 px-9 py-3 font-bold text-lg">
                    Users
                </div>
                <div className="p-2 px-9 py-3">
                    <InputComp />
                </div>
            </div>

            <div className="p-2 px-9 py-8" >
            <Suspense fallback={<div>Loading ..</div>}>
                <UserList />
            </Suspense>
            </div>
        </>
    )
}

export default MainDashComp;