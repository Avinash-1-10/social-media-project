import { useForm } from "react-hook-form";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Copyright from "../components/CopyRight";
import { useState } from "react";
import Notification from "../components/errors/Notification";

const defaultTheme = createTheme();

const SignUp = ()=> {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackData, setSnackData] = useState({ success: true, message: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const watchPassword = watch("password", "");

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        data
      );
      if(response.status === 201){
        setSnackData({ success: true, message: "Registered successfully" });
        setOpen(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      setSnackData({ success: false, message: "Registration unsuccessful" });
      setOpen(true)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstname", { required: true })}
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
                {errors.firstname && (
                  <Typography variant="caption" color="error">
                    First Name is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastname", { required: true })}
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                />
                {errors.lastname && (
                  <Typography variant="caption" color="error">
                    Last Name is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("username", { required: true })}
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="family-name"
                />
                {errors.username && (
                  <Typography variant="caption" color="error">
                    User Name is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {errors.email && (
                  <Typography variant="caption" color="error">
                    {errors.email.type === "required"
                      ? "Email is required"
                      : "Enter a valid email address"}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", { required: true })}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <Typography variant="caption" color="error">
                    Password is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === watchPassword || "Passwords do not match",
                  })}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirm Password"
                  type="password"
                  id="confirmPassword"
                />
                {errors.confirmPassword && (
                  <Typography variant="caption" color="error">
                    {errors.confirmPassword.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
            {loading ? <CircularProgress /> : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Notification open={open} setOpen={setOpen} snackData={snackData}/>
    </ThemeProvider>
  );
}

export default SignUp;