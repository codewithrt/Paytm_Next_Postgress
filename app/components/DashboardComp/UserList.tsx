"use client"

import {useRecoilValue} from "recoil"
import {UserSelector} from "../atoms/atom";
// import UserComp from "./Usercomponent";
import UserComp from "./Usercomponent";
const UserList = ()=>{
    const Users = useRecoilValue(UserSelector);

    const OurUsers = Users;
   
    return (
        <>
         {OurUsers.map((user:any)=>{
                     return <UserComp key={user.id} user={user}/>
                 })}
        </>
    )
}

export default UserList;