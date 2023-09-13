"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const res = await fetch("/api/users/verifyemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const json = await res.json();

      //pop up notification
      if (res.ok) {
        toast.success(json.message);
        setVerified(true);
      } else {
        toast.error(json.error || json.message);
      }
    } catch (error: any) {
      setError(true);
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    //url after (=) the token will be extract
    const urlToken = window.location.search.split("=")[1];
    setToken(decodeURIComponent(urlToken) || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="bg-orange-600 p-1 my-2 rounded">
        {token ? token : "Nothing"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl my-2">Email has been Verified</h2>
          <Link className="bg-blue-600 rounded p-2 " href="/login">
            Login here
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-700">Error Occured</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
