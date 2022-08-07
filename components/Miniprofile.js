import { useSession, signOut } from 'next-auth/react'
import React from 'react'

const Miniprofile = () => {
  const {data:session}=useSession()

  return (
    
    <div className='flex items-center mt-14 ml-10 justify-between'>
      <img src={session?.user?.image}
      className='h-16 w-16 border rounded-full p-[2px]'/>
      

    <div className='flex-1 mx-4'>
    <h2 className='font-bold'>{session?.user?.username}</h2>
    <h3 className='text-gray-400 text-sm'>Welcome to Instagram!</h3>
    </div>

    <button onClick={signOut} className='text-blue-400 text-sm text-semibold'>Sign Out</button>
    </div>
  )
}

export default Miniprofile
