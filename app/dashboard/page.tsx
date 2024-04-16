"use client"

import { Suspense } from "react";
import MainDashComp from "../components/DashboardComp/MainDashComp";
// import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
// import { InputUserAtom, IsLogAtom, TellAmount, UserSelector } from "../components/atoms/atom";
// import LogOut from "../components/DashboardComp/LogOut";
// import NameComp from "../components/DashboardComp/NameComp";
// import YourBalance from "../components/DashboardComp/YourBalance";
// import UserList from "../components/DashboardComp/UserList";
// import InputComp from "../components/DashboardComp/InputComp";

const Dashboard = () => {
     

   return (
      <>
         <div className="bg-white h-full h-screen">
         <Suspense fallback={<div>Loading ..</div>}>
               <MainDashComp/>
            </Suspense>
         </div>

      </>
   )
}

export default Dashboard;