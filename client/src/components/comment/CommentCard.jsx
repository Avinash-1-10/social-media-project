import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const CommentCard = ({ comment }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          p: 2,
          borderRadius: "5px",
          bgcolor: "black",
          minWidth:"300px"
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>
            {comment.user.username===userData.username?"You":comment.user.username}
          </Typography>
          <Typography>{comment.content}</Typography>
        </Box>
       {comment.user.username===userData.username && <IconButton><DeleteIcon/></IconButton>}
      </Box>
    </>
  );
};

export default CommentCard;
