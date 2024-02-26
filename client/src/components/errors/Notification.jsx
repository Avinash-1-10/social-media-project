import React from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

const Notification = ({ open, setOpen, snackData }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        onClick={handleClose}
        color="primary"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        key={"top" + "center"}
      >
        <Alert
          onClose={handleClose}
          severity={snackData.success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackData.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;
