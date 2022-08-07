import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { 
    HeartIcon,
    PlusCircleIcon,
    DotsHorizontalIcon,
    BookmarkIcon,
    ChatIcon,
    EmojiHappyIcon,
    PaperAirplaneIcon,
   } from '@heroicons/react/outline'
  import Moment from "react-moment"
   import { HeartIcon as HeartIconFilled} from '@heroicons/react/solid'
import { async } from '@firebase/util'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
function Post({id,username,userimg,img,caption})  {
    const {data:session}=useSession()
     const [c, setC]=useState('')
     const [comments, setComments]= useState([])
     const [likes, setLikes]=useState([])
     const [hasLikes, setHaslikes]=useState(false)
    useEffect(
        () => 
        onSnapshot(
            query(
                collection(db, 'posts', id, 'comments'), 
                orderBy('timstamp', 'desc'))
                , (snapshot) => setComments(snapshot.docs), 
          ),  [db, id])

          useEffect(() =>
          onSnapshot(collection(db, 'posts', id, 'likes'),
          snapshot =>{
            setLikes(snapshot.docs)
          }), [db,id])

          const likePost = async () =>{
            if(hasLikes){
                await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
            }
            else{
             await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username:session.user.username
             })
            }
          }
          useEffect(()=>{
            setHaslikes(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
          },[likes])

    const sendComment =async (e) =>{
        e.preventDefault()
        const sendC= c;

        setC('')
        await addDoc(collection(db, 'posts', id , 'comments'),{
            c: sendC,
            username:session.user.name,
            profImage:session.user.image,
            timstamp:serverTimestamp()
        })
    }

  return (
    <div className='bg-white my-7 border rounded-sm'>
        {/*Hearder */}
    <div className='flex items-center p-5'>
      <img src={userimg} 
      className='rounded-full  border p-1 h-12 w-12 mr-3 object-contain'/>
      <p className='flex-1 font-bold'>  {username}</p>
        <DotsHorizontalIcon className='h-5'/>
    </div>
    {/*IMG */}
    <img src={img} className='w-full object-cover'/>
    {/*ICON */}
    {session && (
        <div className='flex justify-between pt-4 px-4 '>
        <div className='flex space-x-4'>
            { hasLikes ? ( <HeartIconFilled onClick={likePost} className='btn text-red-500' />):
             (<HeartIcon onClick={likePost} className='btn'/>) }
            
            <ChatIcon className='btn'/>
            <PaperAirplaneIcon className='btn rotate-45'/>
        </div>
        <BookmarkIcon className='btn'/>
    </div>
    )}
    
    {/*Caption */}
    <div className='p-5 truncate'>
        {
            likes.length >0 && (
                <p className='font-bold mb-1'>{likes.length} likes</p>
            )
        }
        <p>
            <span className='font-bold mr-1'>{username} </span>{caption}
        </p>
    </div>
    {/*Coment */}
{comments.length>0 && (
    <div className='ml-10 h-20 overflow-y-scroll
    scrollbar-thumb-black scrollbar-thin'>
        {      comments.map((c) =>(
                <div key={c.id} className='flex items-center space-x-2 mb-3'>
                    <img className='h-7 rounded-full' src={c.data().profImage} />
                    <p className='text-sm flex-1'>
                        <span className='font-bold'>{c.data().username}</span>{" "}
                    {c.data().c}</p>
                    <Moment className='pr-5 text-sm' fromNow>
                        {c.data().timstamp?.toDate()}
                    </Moment>
                </div>
               
            ))
        }
    </div>
)}

    {/*Input field */}
    {session && (
    <form className='flex items-center pt-4 px-4 '>
        <EmojiHappyIcon className='h-7 '/>
        <input className='flex-1 border-none outline-none focus:ring-0 '
        value={c}
        onChange={(e) => setC(e.target.value )}
        type='text' placeholder='Add a Comment...'/>
        <button type='submit'
        disabled={!c.trim()}
        onClick={sendComment} className='font-semibold text-blue-400'>Post</button>
    </form>)}
    </div>
  )
}

export default Post
