import React, {useEffect, useState} from 'react'
import { faker } from '@faker-js/faker';


    
const Suggestions = () => {
  const [suggetions, setSuggetions]= useState([])
    useEffect(()=>{
    const suggetions=[...Array(5)].map((_,i)=>({
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
        id:i,
        company:faker.company.companyName()
    })
    )
    setSuggetions(suggetions)
    },[])    
  return (
    <div className='mt-4 ml-10'>
      <div className='mb-5 text-sm flex justify-between'>
        <h2 className='text-sm text-gray-400'>Suggestions for you</h2>
        <button className='text-gray-600 font-semibold text-sm'>See All</button>
      </div>

      {
        suggetions.map(profile =>(
          
          <div className='flex items-center mt-3 justify-between'>
            <img className='rounded-full border  p-[2px] h-10 w-10 '
            src={profile.avatar}/>
            <div className='flex-1 ml-4'>
            <h2 className='text-sm font-semibold'>{profile.username}</h2>
            <h3 className='text-xs text-gray-400'>Works at {profile.company}</h3>
          </div>
          <button className='text-sm text-blue-400'>Follow</button>
          </div>
        ))
      }
    </div>
  )
}

export default Suggestions
