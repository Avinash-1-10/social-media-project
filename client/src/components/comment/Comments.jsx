import React, { useEffect, useState } from "react";
import { Typography,Box } from "@mui/material";
import axios from "axios";
import CommentCard from "./CommentCard";

const Comments = ({ commentId }) => {

  const [comment, setComment] = useState("loading");

  const getComment = async()=>{
    const {data} = await axios.get(`http://localhost:8080/api/comment/user/${commentId}`);
    setComment(data)
  }

  useEffect(()=>{
    getComment();
  },[])
  return (
    <div>
      {comment === "loading" ? (
        <Typography>Loading</Typography>
      ) : (
        <Box>
            <CommentCard comment={comment}/>
        </Box>
      )}
    </div>
  );
};

export default Comments;
