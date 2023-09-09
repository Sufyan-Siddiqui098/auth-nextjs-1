import {connect}  from "@/dbConfig/dbConfig";
import User from '@/models/userModel' ;
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'


// Connecting to DB
connect()

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json()
        const {email, password} = reqBody;

        // Check if user exist
        const user = await User.findOne({email}) 
        if(!user){
            return NextResponse.json({error: "User doesn't exist"}, {status: 400})
        }
        
        //Check if the password is correct  
        const validatePasasword = await bcrypt.compare(password, user.password)
        if(!validatePasasword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        //Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //Create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!,{expiresIn: '1d'})

        //Crate response 
        const response = NextResponse.json({
            message: "Login Successfully",
            success: true
        })
        // set the cookies 
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({msg: 'erro',error: error.message}, {status: 500})
    }
} 