import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
import Miniprofile from './Miniprofile'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'
const Feed = () => {
  const {data:session}=useSession()
  return (

    <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl lg:grid-cols-3 lg:max-w-6xl mx-auto ${!session && "!grid-cols-1 !sr-onlymax-w-3xl"}`}>
        
      {/* Left scetion */}
      <section className='col-span-2'>
        {/* Sotires */}
        <Stories/>
        {/* Posts */}
        <Posts/>
      </section>
          
{session && (<section className='hidden xl:inline-grid md:col-span-1'>
        {/* Mini profile */}
        {/* Suggetions */}
        <div className='fixed top-20' >
          <Miniprofile/>
          <Suggestions/>
          
        </div>
        
      </section>)}
      {/* Right scetion */}
      
    </main>
  )
}

export default Feed
