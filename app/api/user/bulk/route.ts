import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
const prisma = new PrismaClient();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../../../../config");


export async function POST(req:NextRequest){
    // console.log(req);
    const body = await req.json();
   
    const firstName = body.query.firstName;
    const lastName = body.query.lastName;

    
    let user
    try {
        if (firstName !== '' || lastName !== '') {
             
            user = await prisma.user.findMany({
                where: {
                    OR: [{
                        firstName: {
                            contains: firstName,
                            mode: 'insensitive'
                        }},
                        {
                        lastName: {
                            contains: lastName,
                            mode: 'insensitive'
                        }
                    }]
                }
            })
        } else {
            user = await prisma.user.findMany({});
            // user = [{}];
        }
        return NextResponse.json({
            users: user.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user.id
            }))
            
        });
        
    } catch (error) {
        console.log(error);
    }
}

