import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const AdCard = ({ imageUrl, text, isSponsored }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt="Advertisement"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
        {isSponsored && (
          <Box mt={1}>
            <Typography variant="caption" color="text.secondary">
              Sponsored
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AdCard;
