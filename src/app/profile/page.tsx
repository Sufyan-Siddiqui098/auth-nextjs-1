'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';



const ProflePage = () => {
  interface User {
    username: string;
    email: string;
    _id?: string;
  }
  const router = useRouter();
  const [user, setUser] = useState<User>({username:"", email:"", _id: ''})
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
      setUser(json.user) 
    }

    useEffect(()=>{
      console.log('useeffect is running inside profile')
      if(!user.username){
        console.log('not')
        getUserdetail()
      }
    },[])


  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <Link href='/' className='absolute top-4 left-4 border-2 hover:underline p-2 text-sm rounded'>&lt; Back to Home</Link>
      <div className='text-2xl'>Profile Page</div>

      {/* User render with name and email */}
      {user.username && <div className='my-4  flex flex-col justify-center items-center min-h-[30vh]'>
          <div className='border-2 rounded-full min-w-max  my-1 text-center px-8 py-7 text-5xl bg-gray-700 bg-opacity-75 '>{user.username[0].toUpperCase()}</div>
          <h2 className='text-3xl my-2 text-start'>{user.username}</h2>
          <p className='text-xl text-gray-300'>{user.email}</p>
      </div> }

      <button onClick={logout} className='bg-blue-700 p-3 mt-4 rounded-lg text-xl hover:bg-blue-900'>Logout</button>
      
    </div>
  )
}

export default ProflePage