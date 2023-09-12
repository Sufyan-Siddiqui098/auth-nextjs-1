import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export const POST =async (req: NextRequest) => {
    try{
        const reqBody = await req.json();
        const {email} = reqBody;

        //Find user
        const user = await User.findOne({email}).select('-password')
        if(!user) {
            return NextResponse.json({message: "Invalid Email"}, {status: 404})
        }

       await sendEmail({email, emailType:"RESET", userId: user._id})

       return NextResponse.json({
        message: "Verification email has been sent",
        success: true
       })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    } 
} 