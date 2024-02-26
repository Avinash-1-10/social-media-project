import { Avatar, Stack, Box, Paper, IconButton, useTheme } from "@mui/material";
import PostButton from "./PostButton";
import { tokens } from "../../theme";
const StoryList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Paper elevation={0}>
      <Box
        backgroundcolor={colors.grey[900]}
        sx={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          p={1}
          overflow="scroll"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <PostButton />
          {[1, 2,8].map((s, i) => (
            <IconButton key={i}>
              <Avatar sx={{ width: "70px", height: "70px" }}>H</Avatar>
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default StoryList;
