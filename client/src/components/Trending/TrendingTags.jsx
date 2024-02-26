import React from "react";
import { Box, Typography, Chip, Paper } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const TrendingTags = ({ tags }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Paper sx={{ mt: 2, p: 1 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", color: colors.blueAccent[500] }}
      >
        Trending Tags
      </Typography>
      <Box
        sx={{ width: "100%", display: "flex", flexWrap: "wrap", p: 1, gap: 1 }}
      >
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={`#${tag}`}
            sx={{color: colors.blueAccent[500], outlineColor:colors.blueAccent[500]}}
            variant="outlined"
          />
        ))}
      </Box>
    </Paper>
  );
};

export default TrendingTags;