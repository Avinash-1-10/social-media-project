import React, { useState } from "react";
import { Avatar, Stack,IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreatePost from "../post/CreatePost";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const PostButton = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <IconButton onClick={()=>setOpen(!open)}>
      <Avatar sx={{ width: "70px", height: "70px", bgcolor:colors.blueAccent[500] }}>
        <AddIcon />
      </Avatar>
      </IconButton>
      <CreatePost open={open} setOpen={setOpen}/>
    </div>
  );
};

export default PostButton;
