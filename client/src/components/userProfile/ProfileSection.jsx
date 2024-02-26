import React, { useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  Paper,
  Avatar,
  Container,
  Box,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ProfilePosts from "./ProfilePosts";
import ProfileForm from "./ProfileForm";
import { editUser } from "../../redux/slices/userSlice";
import useDate from "../../hooks/useDate";
import axios from "axios";
import AvatarDialog from "./AvatarDialog";
import CoverDialog from "./CoverDialog";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const ProfileSection = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user =
    useSelector((state) => state.user.user) ||
    JSON.parse(localStorage.getItem("userData"));
  const [open, setOpen] = React.useState(false);
  const [avatarDialog, setAvatarDialog]= useState(false);
  const [coverDialog, setCoverDialog] = useState(false)
  const dob = useDate(user?.dateOfBirth);
  const joinDate = useDate(user?.createdAt);
  const avatar = user?.profilePicture ||
  "https://randomuser.me/api/portraits/lego/1.jpg";
  const cover = user?.coverPicture || "https://images.hdqwalls.com/wallpapers/bthumb/samsung-galaxy-s9-zk.jpg"

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Paper sx={{ height: "100vh" }}>
      <Box sx={{ position: "relative", width: "100%" }}>
        <img
          src={cover}
          alt=""
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
          }}
          onClick={()=>setCoverDialog(true)}
        />
        <Avatar
          src={avatar}
          alt=""
          sx={{
            position: "absolute",
            bottom: "-45px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "100px",
            border: "3px solid #fff",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
          onClick={()=>setAvatarDialog(true)}
        />
        <IconButton
          sx={{
            position: "absolute",
            bottom: -15,
            right: 0,
            transform: "translateX(-50%)",
            bgcolor: "#2196F3",
            color: "white",
            ":hover": { bgcolor: "white", color: "#2196F3" },
          }}
          onClick={handleClickOpen}
        >
          <EditIcon />
        </IconButton>
      </Box>
      <Box sx={{ mt: 5, display: "flex", pb: 2 }}>
        <Container sx={{ borderRight: "1.2px solid #1876D0" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#1876D0" }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography>{user?.profession}</Typography>
          <Typography>Date of Birth: {dob}</Typography>
          <Typography>Joined on {joinDate}</Typography>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Container
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#1876D0" }}
            >
              {user?.following.length}
            </Typography>
            <Typography sx={{ color: "gray" }}>Following</Typography>
          </Container>
          <Container
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#1876D0" }}
            >
              {user?.followers.length}
            </Typography>
            <Typography sx={{ color: "gray" }}>Followers</Typography>
          </Container>
        </Container>
      </Box>
      <Divider sx={{ mx: 3 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: colors.grey[800],
        }}
      >
        <Container sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <IconButton>
            <ImageIcon sx={{ height: "1.5rem", width: "1.5rem", color:colors.blueAccent[500] }}  />
          </IconButton>
        </Container>

        <Container sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <IconButton>
            <VideocamIcon sx={{ height: "1.5rem", width: "1.5rem" }}/>
          </IconButton>
        </Container>
      </Box>
      <Box sx={{ pt: 2, maxHeight: "calc(100vh - 400px)", overflow: "scroll" }}>
        <ProfilePosts />
      </Box>
      <ProfileForm open={open} setOpen={setOpen} />
      <AvatarDialog open={avatarDialog} setOpen={setAvatarDialog} avatar={avatar} id={user._id}/>
      <CoverDialog open={coverDialog} setOpen={setCoverDialog} cover={cover} id={user._id}/>
    </Paper>
  );
};

export default ProfileSection;
