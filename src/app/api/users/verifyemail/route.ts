import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect()

export const POST = async (request: NextRequest) => {
    try{
        const reqBody = await request.json()
        const {token} = reqBody;
        //Find user based on token
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()} //Query based --> $gt= greater-than
        })
        // If user not exist
        if(!user){
            return NextResponse.json({
                message: "User not found !"}, {status: 400})
        }
        //re-writing into DB
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "User verified successfully ",
            success: true
        })




    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
} 