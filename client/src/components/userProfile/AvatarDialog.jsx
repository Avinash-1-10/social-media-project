// const [selectedImage, setSelectedImage] = useState(null);
// const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };
//   <input
//           id="avatar"
//           type="file"// Attach ref to input element
//           style={{ display: "none" }} // Hide the input element
//           accept="image/*" // Allow only image files
//           onChange={handleImageChange} // Handle file selection
//         />
//         URL.createObjectURL(selectedImage)

import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Dialog, Box } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
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
}));

export default function AvatarDialog({ open, setOpen, avatar, id }) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadAvatar = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      try {
        const { data } = await axios.put(
          `http://localhost:8080/api/user/avatar/${id}`,
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
          Edit Avatar
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
          <Box sx={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : avatar}
              alt=""
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "50%",
                margin: "0 auto",
              }}
            />
            <input
              type="file"
              id="avatar"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <label htmlFor="avatar">
            <EditIcon sx={{ cursor: "pointer" }} />
          </label>
          <IconButton onClick={uploadAvatar} disabled={selectedImage?false:true}>
            <UploadIcon />
          </IconButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
