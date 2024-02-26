import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Button,
  createTheme,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import Copyright from "../components/CopyRight";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "../components/errors/Notification";

const defaultTheme = createTheme();

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackData, setSnackData] = useState({ success: true, message: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/forgotpassword",
        {
          email: data.email,
        }
      );
      if (response.status === 200) {
        setSnackData({
          success: true,
          message: "Your new password has been sent to your email",
        });
        setOpen(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      setSnackData({
        success: false,
        message:
          "Failed to send the new password to your email. Please try again later.",
      });
      setOpen(true);
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
            Forgot Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  error={!!errors.email}
                  helperText={
                    errors.email
                      ? errors.email.type === "required"
                        ? "Email is required"
                        : "Enter a valid email address"
                      : ""
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress /> : "Get Password on email"}
            </Button>
            <Grid container justifyContent="space-between" gap={10}>
              <Grid item>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Notification open={open} setOpen={setOpen} snackData={snackData} />
    </ThemeProvider>
  );
};

export default ForgotPassword;
