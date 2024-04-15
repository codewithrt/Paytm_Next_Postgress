import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
const prisma = new PrismaClient();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../../../../config");

export async function POST(req:NextRequest){
    const body = await req.json();
    const to = body.params.to;   
    const amount = body.params.amount;
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
    const user  = success.userId;
    const userbalance = await prisma.account.findUnique({
          where:{
            UserId:user
          }
    })
    if(!userbalance || userbalance.Balance<amount){
        // res.status(403).json({
        //     message:"Insufficient Balance"
        // })
        return NextResponse.json({ message:"Insufficient Balance"},{status:403});
    }
    const touser = await prisma.account.findUnique({
        where:{
            UserId:to
        }
    })
    
    if(touser === null){
        // console.log("I logged 2");
        // res.status(403).json({
        //     message:"Invalid Account"
        // })
        return NextResponse.json({message:"Invalid Account"},{status:403});
    }


    try {
        await prisma.$transaction(async(tx)=>{
            // Decreemnt from Sender
            const sender = await tx.account.update({
                data:{
                    Balance:{
                        decrement:amount
                    }
                },
                where:{
                    UserId:user
                }
            })
            if (sender.Balance<0) {
                
                throw new Error(`${user} doesn't have enough to send ${amount}`)
                
                // return;
            }
            const recipient = await tx.account.update({
                data:{
                    Balance:{
                        increment:amount
                    }
                },
                where:{
                    UserId:to
                }
            })
    
        })
        // res.status(200).json({
        //     message:"Transfer Successful"
        // })
        return NextResponse.json({message:"Transfer Successful"});
    } catch (error) {
        console.log(error);
        
        // res.status(403).json({
        //     message:error
        // })
        return NextResponse.json({message:error},{status:403});
    }
}