'use client'
import Link from 'next/link'
import React,{useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'


const LoginPage = () => {
    const [user, setUser] = React.useState({
        email: "",
        password: ''
    })
    const router = useRouter();
   
    const [buttonDisable, setButtonDisable] = React.useState(false)
    const [loading, setLoading]  = React.useState(false)

    useEffect(() => {
      if(user.email.length>0 && user.password.length>0){
            setButtonDisable(false)
      } else {
        setButtonDisable(true)
      }
    }, [user])

// --- Login Function
    const onLogin = async() => {
      try {
        setLoading(true);

        let response = await fetch('/api/users/login', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(user)
        })

        const json = await response.json()

        if(response.ok){
          toast.success(json.message)
        } else{
          toast.error(json.message || json.error)
        }

        router.push('/profile')
      } catch (error:any) {
        toast.error(error.message)
      } finally{
        setLoading(false)
      }
    }
  return (
    <div className='flex gap-1 flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-2xl my-2 '>Login</h1>
        <hr />
       
        <label htmlFor="email">email</label>
        <input 
            type="email"
            id='email' 
            placeholder='email' 
            className='p-2 focus:outline-none focus:border-gray-600 rounded-md text-black' 
            value={user.email}
            onChange={(e)=>setUser({...user, email: e.target.value})}
        />
        <label  htmlFor="password">password</label>
        <input 
            type="password"
            id='password' 
            placeholder='password' 
            className='p-2 focus:outline-none focus:border-gray-600 rounded-md text-black' 
            value={user.password}
            onChange={(e)=>setUser({...user, password: e.target.value})}
        />
        {/* Button */}
        <button 
        disabled = {buttonDisable}
        onClick={onLogin}
        className='disabled:cursor-not-allowed disabled:opacity-60 p-2 border border-gray-100 
        rounded-lg my-4 focus:outline-none
         focus:border-gray-600'>Login here</button>

         <Link href='/signup'>Visit Signup page</Link>
    </div>
  )
}

export default LoginPage;