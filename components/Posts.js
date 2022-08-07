import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Snapshot } from 'recoil'
import { db } from '../firebase'
import Post from './Post'
const Posts = () => {
    const [post, setPost]=useState([])
    useEffect(()=>{

           const unsubscribe=  onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc' )), snapshot =>{
                setPost(snapshot.docs)
           })
            return unsubscribe;
    }, [db])
  return (
    <div>
        {post.map(p=>(
            <Post
             key={p.id}
             id={p.id}
             username={p.data().username}
             userimg={p.data().profileImage}
             img={p.data().image}
             caption={p.data().caption}
            />
        ))}
    </div>
  )
}
export default Posts
