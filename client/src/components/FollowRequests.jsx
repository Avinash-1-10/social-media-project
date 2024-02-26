import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  CardContent,
  Container,
  IconButton,
  Typography,
  Card,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/system";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useSelector } from "react-redux";
import FollowRequestCard from "./FollowRequestCard";
import axios from "axios";

const FollowRequests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userData =
    useSelector((state) => state.user.user) ||
    JSON.parse(localStorage.getItem("userData"));

  const [requests, setRequests] = useState([]);
  const getUser = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/follow/requests/${userData._id}`
    );
    setRequests(data.followRequests);
  };

  useEffect(() => {
    getUser();
    console.log(requests)
  }, []);

  return (
    <Container
      sx={{
        maxHeight: "calc(100vh - 450px)",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {requests.length === 0 && (
          <Typography sx={{ textAlign: "center", color: "gray" }}>
            There are no follow requests.
          </Typography>
        )}
        {requests.map((user) => (
          <FollowRequestCard key={user._id} user={user} />
        ))}
      </Box>
    </Container>
  );
};

export default FollowRequests;
