import React from 'react'

const UserProfile = ({params}:any) => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
        <div className='p-2 rounded-lg my-3 bg-amber-950 text-white'>User Profile: {decodeURI(params.id)}</div>
        <div className='p-2 rounded-lg my-3 bg-blue-600'>type: {typeof params.id}</div>
    </div>
  )
}

export default UserProfile