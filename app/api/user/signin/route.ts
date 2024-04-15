import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../../../../config");

const SigninZod = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

export async function POST(req:NextRequest){
    // console.log(req);
    
    const body = await req.json();
    const success = SigninZod.safeParse(body.params);
    if (!success) {
        // res.status(411).json({
        //     message: "Error while Logging in",
        // })
        return NextResponse.json({message: "Error while Logging in"},{status:411});
    }
    // const username = req.body.params.username;
    // const password = req.body.params.password;
    const username = body.params.username;
    const password = body.params.password;
    // console.log(username,password);
    // const UserStat = await User.findOne({username:username,password:password});
    const UserStat = await prisma.user.findUnique({
        where: {
            username: username,
            password: password
        }
    })

    if (UserStat) {
        const token = jwt.sign({
            userId: UserStat.id,
        }, JWT_SECRET_KEY)
        // res.status(200).json({
        //     token: token,
        // })
        return NextResponse.json({token:token});
    }
    // console.log("I logged");
    // res.status(411).json({
    //     message: "Error while Logging in",
    // })
    // return NextResponse.
    // return NextResponse.json({message:"Error while Logging in"});
    // return NextResponse.
    return NextResponse.json({message: "Error while Logging in"},{status:411});
}