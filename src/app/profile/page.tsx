'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

const ProflePage = () => {
  const router = useRouter();
  const [user, setUser] = useState('')
    //Logout function
    const logout = async () => {
      try {
        let respone = await fetch('/api/users/logout')
        let json = await respone.json()
        console.log(respone)
        if(respone.ok){
          toast.success(json.message)
          router.push('/login')
        } else {
          toast.error(json.message || json.error)
        }


      } catch (error:any) {
        return toast.error(error.message)
      }
    }
  
    const getUserdetail =async () => {
      const response = await fetch('/api/users/me')
      const json = await response.json();
      console.log(json)
      setUser(json.user._id)
      
    }
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <div className='text-2xl'>Profile Page</div>

      <h2 className='bg-green-600 p-1 rounded my-2'>{user? <Link href={`/profile/${user}`}>{user}</Link>: "Nothing"}</h2>

      <button onClick={logout} className='bg-blue-700 p-3 mt-4 rounded-lg text-xl hover:bg-blue-900'>Logout</button>

      <button onClick={getUserdetail} className='bg-green-900 p-3 mt-4 rounded-lg text-xl hover:bg-blue-900'>Get User</button>
    </div>
  )
}

export default ProflePage