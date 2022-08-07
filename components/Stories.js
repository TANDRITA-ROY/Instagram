import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import Story from './Story'
import { useSession } from 'next-auth/react'
const Stories = () => {
    const [suggetions, setSuggetions]= useState([])
    const {data:session}=useSession()
    useEffect(()=>{
    const suggetions=[...Array(20)].map((_,i)=>({
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
        id:i,
    })
    )
    setSuggetions(suggetions)
    },[])    
  return (
    <div className='flex overflow-scroll p-6 space-x-2 border border-gray-200 bg-white mt-8
     rounded-sm scrollbar-thin scrollbar-thumb-black'>
      {session && <Story img={session.user.image} username={session.user.name}/>}
      { suggetions.map(profile =>(
         <Story key={profile.i} img={profile.avatar} username={profile.username}/>
        ))
      }
    </div>
  )
}

export default Stories
