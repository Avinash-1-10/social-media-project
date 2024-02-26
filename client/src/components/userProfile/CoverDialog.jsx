import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  width: "100vw", // Set width to 100vw
}));

export default function CoverDialog({ open, setOpen, cover, id }) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadCover = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      try {
        const { data } = await axios.put(
          `http://localhost:8080/api/user/cover/${id}`,
          formData
        );
        // console.log(data);
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    } else {
      console.warn("No image selected for upload.");
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change Avatar
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ minWidth: "300px" }}>
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : cover}
            alt=""
            style={{
              width: "100%",
              height: "100px",
              objectFit: "cover",
              margin: "0 auto",
            }}
          />
          <input
            type="file"
            id="avatar"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </DialogContent>
        <DialogActions>
          <label htmlFor="avatar">
            <EditIcon sx={{ cursor: "pointer" }} />
          </label>
          <IconButton onClick={uploadCover}>
            <UploadIcon />
          </IconButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
