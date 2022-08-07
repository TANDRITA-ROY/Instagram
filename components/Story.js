import React from 'react'

function Story(props)  {
  return (
    <div>
      <img className='
      h-14 w-14 rounded-full p-[1.6px] border-2
       border-red-500
       object-contain cursor-pointer
       hover:scale-110 
       transition transform duration-200 ease-out' src={props.img}/>
      <p className='w-14 truncate text-sm text-center'>{props.username}</p>
    </div>
  )
}

export default Story
