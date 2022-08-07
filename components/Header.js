import Image from 'next/image'

import { BeakerIcon,
  SearchIcon,
  PaperAirplaneIcon,
  MenuIcon,UserGroupIcon,
  HeartIcon,
  PlusCircleIcon
 } from '@heroicons/react/outline'

 import { HomeIcon} from '@heroicons/react/solid'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import {modalState} from '../atoms/ModalAtom'
import {

  useRecoilState,

} from 'recoil';

function Header() {
  const {data: session}=useSession()
  const [open, setOpen]=useRecoilState(modalState)
  const router =useRouter()
  console.log(session)
  return (
    <div className='sticky z-50 shadow-sm bg-white top-0 border-b'>
     
     <div  className='flex justify-between max-w-6xl mx-3 xl:mx-auto'>
      {/* Left */}

    
      <div onClick={()=>router.push('/')}  className='relative w-24  hidden lg:inline-grid cursor-pointer'>
     <Image src='https://links.papareact.com/ocw'
     layout='fill' objectFit='contain' />
      </div>
      <div onClick={()=>router.push('/')}  className='relative w-10   lg:hidden flex-shrink-0 cursor-pointer'>
     <Image src='https://links.papareact.com/jjm'
     layout='fill' objectFit='contain' />
      </div>

      {/* Middle */}

      <div className='max-w-xs'>
      <div className='relative mt-1 p-3 rounded-md'>
          <div className='absolute flex inset-y-0 pl-3 items-center pointer-events-none'>
          <SearchIcon className=' h-5 w-5 text-gray-500 block'/>
        </div>
        <input type="text" placeholder='Search' 
        className='bg-gray-50 w-full pl-10 sm:text-sm
        border-gray-300 focus:ring-black focus:border-black rounded-md'/>
      </div>
      </div>
      
      {/* Right */}

      <div className='flex space-x-4 items-center justify-end'>
        <HomeIcon onClick ={()=>router.push('/')} className='navBtn'/>
        <MenuIcon className='h-6  md:hidden cursor-pointer'/>
        {session?
        (<>
        <div className='relative navBtn'>
        <PaperAirplaneIcon className='navBtn rotate-45'/>
        <div className='absolute -top-1 text-white -right-2 text-xs items-center flex animate-pulse rounded-full bg-red-600 h-5 w-5 justify-center'>3</div>
        </div>
        <PlusCircleIcon onClick={()=>setOpen(true)} className='navBtn'/>
        <HeartIcon className='navBtn'/>
        <img onClick={signOut}
        src={session.user.image}
        alt='Profie Picute'  className='h-10 w-10 rounded-full cursor-pointer' />
        </>) : 
       ( <button onClick={signIn}>Sign In</button>) }
      </div>
      </div>

    </div>
  )
}

export default Header
