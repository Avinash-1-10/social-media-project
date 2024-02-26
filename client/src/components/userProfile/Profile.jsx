import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import ProfileCard from "./ProfileCard";
import FollowRequests from "../FollowRequests";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Paper sx={{ width: "100%", height:"100vh" }}>
      <ProfileCard />
      <Box>
        <Typography variant="h6" sx={{textAlign:"center", fontWeight:"bold", m:2}}>Follow Requests</Typography>
      <FollowRequests/>
      </Box>
    </Paper>
  );
};

export default Profile;
