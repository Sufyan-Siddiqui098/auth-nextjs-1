"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    const decodedToken = decodeURIComponent(urlToken)
    setToken(decodedToken || "");
  }, []);

  const onChangePassword = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/users/forgetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      });

      const json = await res.json();
      if(json.success){
        toast.success(json.message);
        router.push("/login");
      } else {
        toast.error(json.message)
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="mb-3 text-3xl">New Password</h1>
      <input
        className="my-2 rounded p-2 text-black"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="my-2 rounded p-2 text-black"
        type="password"
        placeholder="Confirm Password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />

      <button
        onClick={onChangePassword}
        className={`bg-blue-600 p-2 ${loading?"opacity-70":""} mt-4 rounded disabled:cursor-not-allowed ${
          password !== confirmPass ? "bg-red-500" : ""
        } disabled:opacity-50`}
        disabled={
          password.length <= 0 || password !== confirmPass ? true : false
        }
      >
        {loading?"Loading":"Change Password"}
      </button>
    </div>
  );
};

export default NewPassword;
