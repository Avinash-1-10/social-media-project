import { Paper, Grid, useTheme, Box, IconButton, Avatar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const BottomNavigation = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1,
      }}
    >
      <IconButton >
        <HomeIcon sx={{fontSize:"1.5rem"}}/>
      </IconButton>
      <IconButton>
        <SearchIcon sx={{fontSize:"1.5rem"}}/>
      </IconButton>
      <IconButton>
        <KeyboardArrowUpIcon sx={{fontSize:"1.7rem"}}/>
      </IconButton>
      <IconButton>
        <DarkModeOutlinedIcon sx={{fontSize:"1.5rem"}}/>
      </IconButton>
      <IconButton>
        <Avatar sx={{height:"2rem", width:"1.7rem"}}/>
      </IconButton>
    </Paper>
  );
};

export default BottomNavigation;
