import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const navLink = [
    {
      href:'/',
      name: 'Home',
    }, 
  
    {
      href: "/profile",
      name: "Profile"
    }
  ]
  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <header className='bg-neutral-900 min-h-[10vh] w-full p-2 rounded-sm flex item-center  md:pl-10 md:text-xl'>
        <nav className=' flex gap-2 md:gap-5  items-center  '>
          {navLink.map((el,index)=>{
            return (
              <Link key={index} className='hover:underline' href={el.href}>{el.name}</Link>
            )
          })}
        </nav>
      </header>

      <div className="container border-2 rounded-md my-7 p-2 md:p-6">
        <h1 className='font-semibold text-2xl md:text-4xl capitalize'>Welcome to the Home page</h1>
        <p className='my-4 flex items-center '>This is the homepage of the Auth Next.js App. If you want to logout just go to profile you wll have the logout button there.</p>
       <h2 className='font-semibold mb-2 text-xl mt-8 md:text-2xl'>Functionality : </h2>
       <ul className=' list-disc ml-4'>
        <li className='my-1'>On sign up you will get verified by your email.</li>
        <li>If you forgot your password no problem. You can reset your password by you email</li>
       </ul>
      </div>

    </main>
  )
}
