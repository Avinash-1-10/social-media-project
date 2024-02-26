import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Container,
  CssBaseline,
  TextField,
  Slide,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { editUser } from "../../redux/slices/userSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfileForm({ open, setOpen }) {
  const user = useSelector((state) => state.user.user) || JSON.parse(localStorage.getItem("userData")); // Directly select user object
  const dispatch = useDispatch();

  const formattedDate = useMemo(() => {
    if (!user?.dateOfBirth) return ""; // Handle case when dateOfBirth is undefined
  
    const d = new Date(user?.dateOfBirth);
    if (isNaN(d.getTime())) return ""; // Handle case when dateOfBirth is invalid
  
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, [user?.dateOfBirth]);
  // Memoize the formatted date

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [profession, setProfession] = useState(user?.profession || "");
  const [dateOfBirth, setDateOfBirth] = useState(formattedDate || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = user._id;
    dispatch(
      editUser({ id, firstName, lastName, username, dateOfBirth, profession })
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Profile
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: "100%" }}
            >
              <TextField
                margin="normal"
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </Dialog>
    </React.Fragment>
  );
}
