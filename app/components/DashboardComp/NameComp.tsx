"use client"

import { IsLogAtom } from "../atoms/atom";
import { useRecoilValue } from "recoil";

// const IsLogAtom = dynamic(() => import('../components/DashboardComp/NameComp'), { ssr: false })

const NameComp = () => {
    const User = useRecoilValue(IsLogAtom);
    console.log(User);
    
    return (
        <>
            <div className="p-2"><span>Hello, {User?.data.user.firstName} {User?.data.user.lastName}</span></div>
            <div className="p-2 bg-gray-200 rounded-full w-9 h-9 flex justify-center algin-center">
                <span>{User?.data.user.firstName.charAt(0).toUpperCase()}</span>
            </div>
        </>
    )
}

export default NameComp;