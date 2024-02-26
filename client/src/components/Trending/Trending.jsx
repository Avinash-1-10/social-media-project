import { Paper, Box, Typography } from "@mui/material";
import React from "react";
import Navbar from "../navigation/Navbar";
import SocialContact from "./SocialContact";
import StatCard from "./StatCard";
import UserStats from "./UserStats";

const Trending = () => {
  return (
    <Paper sx={{ height: "100vh", maxHeight: "100vh", position: "relative" }}>
      <Navbar />
      <Box sx={{ m: 1, mt: 2 }}>
        <StatCard title="Likes" value={300} />
        <UserStats />
      </Box>
      <Box sx={{position:"absolute", width:"100%", bottom:0}}>
        <SocialContact />
      </Box>
    </Paper>
  );
};

export default Trending;
