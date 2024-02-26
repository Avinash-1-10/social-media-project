import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  Container,
  CardMedia,
  IconButton,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { tokens } from "../../theme";

const FollowToggle = ({ isFollowing, handleFollow }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {isFollowing ? (
        <IconButton onClick={handleFollow}>
          <PersonRemoveIcon
            sx={{ fontSize: "2rem", color: colors.blueAccent[500] }}
          />
        </IconButton>
      ) : (
        <IconButton onClick={handleFollow}>
          <PersonAddIcon sx={{ fontSize: "2rem", color:"gray" }} />
        </IconButton>
      )}
    </>
  );
};

export default FollowToggle;
