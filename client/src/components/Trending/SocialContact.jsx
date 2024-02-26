import React from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const SocialContact = () => {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const socialLinks = [
    {
      icon: <XIcon sx={{ fontSize: 25 }} />,
      link: "https://twitter.com/example",
      color: colors.grey[100],
    },
    {
      icon: <LinkedInIcon sx={{ fontSize: 25 }} />,
      link: "https://www.linkedin.com/in/example",
      color: "#0A66C2",
    },
    {
      icon: <GitHubIcon sx={{ fontSize: 25 }} />,
      link: "https://github.com/example",
      color: "#6e5494",
    },
    {
      icon: <EmailIcon sx={{ fontSize: 25 }} />,
      link: "mailto:example@gmail.com",
      color: "#EA4335",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        px: 3,
        py:1,
        bgcolor:colors.grey[800]
      }}
    >
      {socialLinks.map((item, index) => (
        <Tooltip key={index} title={item.link} placement="top">
          <IconButton
            target="_blank"
            rel="noopener noreferrer"
            href={item.link}
            sx={{ color: item.color, fontSize: 30 }}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default SocialContact;
