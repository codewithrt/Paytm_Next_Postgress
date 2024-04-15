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
//    console.log(success);
   

    try {
        // const user = await User.findById({_id:req.userId});
        const user = await prisma.user.findUnique({
            where: {
                id: success.userId
            }
        })
        // console.log(user);
        
        if (user) {
            return NextResponse.json({
                user: {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    id: user.id
                }
            })
        } else {
            // res.status(403).json({ message: "User not found" });
            return NextResponse.json({message: "User not found"},{status:403})
        }

    } catch (error) {
        // res.status(403).json({ message: "User not found" });
        return NextResponse.json({message: "User not found"},{status:403})
    }
    // NextResponse.json({message: "User not found"},{status:403});
}