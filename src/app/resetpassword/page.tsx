"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const [verificationSent, setVerificationSend] = useState(false)
  const onReset = async() => {
    try{
      setLoading(true)
      const res = await fetch("/api/users/reset", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email})
      })
      const json = await res.json()
      setVerificationSend(true)
      if(res.ok){
        toast.success(json.message)
      } else{
        toast.error(json.error || json.message)
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {!verificationSent && <>
        <h1 className="my-5 text-3xl text-center">Reset Password</h1>
      <input
        className="p-2 rounded-lg text-black "
        type="email"
        name="email"
        id="email"
        placeholder="Type email here"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={onReset} className="py-2 px-4 my-4 rounded-lg  bg-blue-600">Reset</button>
      <Link className="hover:underline" href='/login'>Login Page</Link>
      </>}
      {verificationSent && <>
        <h2 className="text-2xl sm:text-4xl my-4">Check Your Email</h2>
        <p>The verification link has been send to your mail check your mail and reset the password.</p>
      <Link className="hover:bg-blue-600 bg-blue-400 p-2 rounded mt-4 text-black" href='/login'>Login Page</Link>
      </> } 
    </div>
  );
};

export default ResetPassword;
