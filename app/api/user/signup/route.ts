import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../../../../config");


const SignupZod = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

export async function POST(req: NextRequest) {
    const body = await req.json();
    // console.log(body);
    
    const success = SignupZod.safeParse(body.params);
    if (!success) {
        // res.status(411).json({ message: "Email already Exist!!! / Incorrect Inputs" });
        return NextResponse.json({ message: "Email already Exist!!! / Incorrect Inputs" },{status:411});
    }
    // const username = req.body.params.username;
    const username = body.params.username;
    const isUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (isUser !== null) {
        // res.status(411).json({ message: "Email already Exist!!! / Incorrect Inputs" });
        return NextResponse.json({ message: "Email already Exist!!! / Incorrect Inputs" },{status:411});
    }

    // Creating user with account
    const user = await prisma.user.create({
        data: {
            username: username,
            // password: req.body.params.password,
            // firstName: req.body.params.firstName,
            // lastName: req.body.params.lastName,
            password: body.params.password,
            firstName: body.params.firstName,
            lastName: body.params.lastName,
            account: {
                create: {
                    Balance: 1 + Math.random() * 10000
                }
            }
        }
    }
    )

    // return NextResponse.json({messgae:"User Created Sucessfully"});
    const userId = user.id;
    const token = jwt.sign({
        userId: userId
    }, JWT_SECRET_KEY);

    // res.status(200).json({
    //     message: "User Created Sucessfully",
    //     token: token,
    // })

    return NextResponse.json({message:"User Created Sucessfully",token:token});
}

// ,
//      "firstName":"Ashok",
//     "lastName":"Tembhurne"