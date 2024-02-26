import { useTheme } from "@emotion/react";
import { Paper, Box, Typography } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

const StatCard = ({ title, value }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Paper sx={{ display: "flex", justifyContent: "center", gap: 5, bgcolor:colors.grey[800] }}>
      <Box
        sx={{
          width: "full",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 50, fontWeight: "bold", color: "#e6005c" }}>
          20
        </Typography>
        <Typography sx={{ fontSize: 20 }}>Posts</Typography>
      </Box>
      <Box
        sx={{
          width: "full",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 3,
        }}
      >
        <Typography sx={{ fontSize: 50, fontWeight: "bold", color: "#e6005c" }}>
          {value}
        </Typography>
        <Typography sx={{ fontSize: 20 }}>{title}</Typography>
      </Box>
    </Paper>
  );
};

export default StatCard;
