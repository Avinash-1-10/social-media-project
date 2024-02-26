import { useState } from "react";
import { useSelector } from "react-redux";
import ImageIcon from '@mui/icons-material/Image';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  IconButton,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Notification from "../errors/Notification";
import axios from "axios";

export default function PostForm({ handleClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user =
    useSelector((state) => state.user.user) ||
    JSON.parse(localStorage.getItem("userData"));
  const [type, setType] = useState("post");
  const [img, setImg] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackData, setSnackData] = useState({});
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("image", img);
    formData.append("content", content);
    formData.append("user", user._id);

    if (type === "post") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          setLoading(false);
          setSnackData({ success: true, message: "Post created Successfully" });
          setOpen(true);
          setImg(null);
          setContent("");
        }
      } catch (error) {
        setLoading(false);
        setSnackData({ success: false, message: "Something went wrong" });
        setOpen(true);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          setLoading(false);
          setSnackData({ success: true, message: "Post created Successfully" });
          setOpen(true);
          setImg(null);
          setContent("");
        }
      } catch (error) {
        setLoading(false);
        setSnackData({ success: false, message: "Something went wrong" });
        setOpen(true);
      }
    }
  };

  return (
    <Box
      sx={{
        bgcolor: colors.grey[800],
        minWidth: 350,
        padding: 2,
        borderRadius: 1,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid container justifyContent="flex">
        <FormControl component="fieldset">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={type}
            name="radio-buttons-group"
            onChange={handleChange}
          >
            <Box sx={{ display: "flex" }}>
              <FormControlLabel
                value="story"
                control={
                  <Radio
                    sx={{
                      color: colors.blueAccent[500],
                      "&.Mui-checked": {
                        color: colors.blueAccent[500],
                      },
                    }}
                  />
                }
                label="Story"
              />
              <FormControlLabel
                value="post"
                control={
                  <Radio
                    sx={{
                      color: colors.blueAccent[500],
                      "&.Mui-checked": {
                        color: colors.blueAccent[500],
                      },
                    }}
                  />
                }
                label="Post"
              />
            </Box>
          </RadioGroup>
        </FormControl>
        <Button
          autoFocus
          sx={{ color: colors.grey[100], ml: "auto" }}
          onClick={handleClose}
        >
          <CloseIcon />
        </Button>
      </Grid>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Content"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            color: colors.grey[900],
            outlineColor: colors.grey[900],
            borderColor: colors.grey[900],
            "::placeholder": {
              color: colors.grey[900],
            },
          }}
        />
      </FormControl>
      <Box>
        <label htmlFor="image">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="image"
            style={{ display: "none" }}
          />
          <IconButton
            component="span"
            sx={{
              marginTop: 2,
              fontSize: "70px",
              color: colors.blueAccent[500],
            }}
          >
            <ImageIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </label>
      </Box>
      {img && (
        <img
          src={URL.createObjectURL(img)}
          alt=""
          style={{ width: "350px", maxHeight: "500px", borderRadius: "5px" }}
        />
      )}
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button
          component="span"
          variant="contained"
          sx={{ marginTop: 2, color: colors.blueAccent[500] }}
          onClick={handleSubmit}
          disabled={!content.trim() || !img || loading}
        >
          {loading ? <CircularProgress /> : <UploadIcon />}
        </Button>
      </Box>
      <Notification open={open} setOpen={setOpen} snackData={snackData} />
    </Box>
  );
}
