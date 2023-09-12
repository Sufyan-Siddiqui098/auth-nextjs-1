import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export const POST =async (req: NextRequest) => {
    try {
        const reqBody = await req.json()
        const {token, newPassword} = reqBody;
        
        //find user based on token
        const user = await User.findOne({
            forgetPasswordToken: token,
            forgetPasswordTokenExpiry: {$gt: Date.now()}
        })

        if(!user) {
            return NextResponse.json({message: "User not found! | Invalid token", success: false}, {status: 400})
        }

        //Hashing the password
        const hashedPassword = await bcrypt.hash(newPassword,10)
        user.forgetPasswordToken = undefined;
        user.forgetPasswordTokenExpiry = undefined;
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            message: "Password reset successfully",
            success: true
        }, {status: 201})

    } catch (error: any){
        return NextResponse.json({error: error.message})
    }
} 