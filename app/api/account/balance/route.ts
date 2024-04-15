import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
const prisma = new PrismaClient();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../../../../config");



export async function GET(){
   
    const headerlist = headers();
    const authHeader = await headerlist.get("authorization");
    // console.log(typeof(authHeader));
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({message:"No Token/ Invalid Token"},{status:403});
    }

    const token = authHeader.split(' ')[1];
    //    console.log(token,typeof(token));

    let success;
    try {
        success = await jwt.verify(token,JWT_SECRET_KEY);
    } catch (error) {
        return NextResponse.json({message: "Token Expired"},{status:403})
    }

    const account = await prisma.account.findUnique({
        where:{
            id:success.userId
        }
    })
    // res.status(200).json({
    //     balance:account?.Balance
    // })
    return NextResponse.json({balance:account?.Balance},{status:200});
}