import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  CardContent,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/system";
import axios from "axios";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const StyledCard = styled(Card)({
  marginBottom: 8,
  borderRadius: 8,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const FollowRequestCard = ({ user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <StyledCard>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: colors.grey[800],
        }}
      >
        <Avatar sx={{ height: "40px", width: "40px" }} src={user.profilePicture}/>
        <Container>
          <Typography sx={{ fontWeight: "bold" }}>{user.firstName} {user.lastName}</Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            {user?.followers?.length} followers
          </Typography>
        </Container>
        <IconButton>
          <AddCircleIcon color="success" />
        </IconButton>
      </CardContent>
    </StyledCard>
  );
};

export default FollowRequestCard;
