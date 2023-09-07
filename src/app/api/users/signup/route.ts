import {connect}  from "@/dbConfig/dbConfig";
import User from '@/models/userModel' ;
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'; //wrong



connect()

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const {username, password, email} = reqBody;
        console.log('api/signup -inside req')
        // Check user if already exist
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({message: "User Already exist"}, {status: 400})
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // Save on Db
        const savedUser =await newUser.save();
        
        return NextResponse.json({
            message: "User created successfully", 
            status: 201, 
            savedUser})

    } catch (error: any) {
        return NextResponse.json({error: error.message, status : 500})
    }

}