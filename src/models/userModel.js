import {mongoose} from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true    
    }, 
    email: {
        type: String, 
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    //verify the user by emailing him and like we get verified by confirming the mail.
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})


const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;