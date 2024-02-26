import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const UserPost = ({ p, setReload }) => {
    const [loading, setLoading] = useState(false);
  const deletePost = async (postId) => {
    setLoading(true)
    const res= await axios.delete(
      `http://localhost:8080/api/post/${postId}`
    );
    setLoading(false)
    setReload((prev)=>!prev)
  };
  return (
    <Box key={p._id} sx={{ position: "relative" }}>
      <IconButton
        color="secondary"
        sx={{
          position: "absolute",
        }}
        onClick={() => deletePost(p._id)}
        disabled={loading}
      >
        {loading?<CircularProgress />:<DeleteIcon/>}
      </IconButton>
      <img
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "3px",
          objectFit: "cover",
        }}
        src={p.image}
        alt=""
      />
    </Box>
  );
};

export default UserPost;
