import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //Create hashed of userID (i.e _id )
    const hasehdToken = await bcrypt.hash(userId.toString(), 10); //to make sure userId must be string.
    let verificationFor = "";

    if (emailType === "VERIFY") {
      verificationFor = "verifyemail";
      // 3600000 --> in mili-seconds = 1hr
      await User.findByIdAndUpdate(userId, {
        verifyToken: hasehdToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      verificationFor = "newpassword";
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hasehdToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transport = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "sufyanshafiq098@gmail.com",
        pass: process.env.BREVO_KEY,
      },
    });

    const mailOptions = {
      from: "nextauth@developer.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify you email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/${verificationFor}?token=${hasehdToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy paste the link below. <br/> <br/> ${
        process.env.DOMAIN
      }/${verificationFor}?token=${hasehdToken} </p>`,
    };

    const mailResponse = transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
