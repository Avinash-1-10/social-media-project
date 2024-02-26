import { useEffect, useState } from "react";
import axios from "axios";


const useLikeCount = (postId)=>{
    const [count, setCount] = useState("loading");

    const getLikeCount = async()=>{
       const {data} =  await axios.get(`http://localhost:8080/api/post/${postId}`);
       setCount(data.likes.length)
    }
    useEffect(()=>{
        getLikeCount()
    },[postId])

    return count
}

export default useLikeCount;