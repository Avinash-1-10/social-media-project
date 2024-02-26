import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from "@mui/icons-material/Group";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { Avatar, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { tokens } from "../../theme";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userData =
    useSelector((state) => state.user.user) ||
    JSON.parse(localStorage.getItem("userData"));
  console.log("userdata", userData);

  const handleDrawerCloseAndOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: colors.greenAccent[700] }}>
      <CssBaseline />
      {/* <Box sx={{ bgcolor: colors.blueAccent[400] }}> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerCloseAndOpen}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: "User Management", icon: <GroupIcon /> },
            { text: "Content Management", icon: <FileCopyIcon /> },
            { text: "Analytics And Insight", icon: <BarChartIcon /> },
            { text: "Help And Support", icon: <LiveHelpIcon /> },
            { text: "Charts", icon: <DonutSmallIcon /> },
          ].map((item, index) => (
            <ListItem key={item.index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mx: "auto", mt: 20, mb: 1 }}>
          <Tooltip title={userData.firstName}>
            <Avatar
              sx={{ border: "2px solid #fff" }}
              src={userData.profilePicture}
              {...(open && {
                sx: { width: 100, height: 100, border: "2px solid #fff" },
              })}
            />
          </Tooltip>
        </Box>
      </Drawer>
      {/* </Box> */}
    </Box>
  );
}
