import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
const prisma = new PrismaClient();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../../../../config");

export async function PUT(req :NextRequest){
    const headerlist = headers();
    const authHeader = await headerlist.get("authorization");
    // console.log(typeof(authHeader));
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({message:"No Token/ Invalid Token"},{status:403});
    }

    const token = authHeader.split(' ')[1];
    //    console.log(token,typeof(token));
    const body = await req.json();
    // const userId = req.cookies.get("userId");
    // console.log(userId);
    const success = await jwt.verify(token,JWT_SECRET_KEY);
        // console.log(success);
    // console.log(body);
    
    const password = body.params.password;
    const firstName = body.params.firstName;
    const lastName = body.params.lastName;

    try {
        await prisma.user.update({
            where: {
                id: success.userId
            },
            data: {
                password: password,
                firstName: firstName,
                lastName: lastName,
            }
        })
        // res.status(200).json({
        //     message: "Updated Successfully",
        // })
        return NextResponse.json({ message: "Updated Successfully"});
    } catch (error) {
        // res.json(411).json({
        //     message: "Error while updating !!!",
        // })
        return NextResponse.json({ message: "Error while updating !!!"},{status:411});
    }
    return NextResponse.json({ message: "I ended here"});
}