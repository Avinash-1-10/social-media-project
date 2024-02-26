import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle, Box, Typography, TextField } from "@mui/material";
import axios from "axios";
import Comments from "./Comments";

export default function ScrollDialog({ setOpen, open, postId }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [scroll, setScroll] = React.useState("paper");
  const [comments, setComments] = React.useState([]);
  const [content, setContent] = React.useState("");

  const getComments = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/comment/${postId}`
    );
    setComments(data);
  };

  React.useEffect(() => {
    getComments();
  }, []);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleComment = async () => {
    const { data } = await axios.post(`http://localhost:8080/api/comment`, {
      userId: userData._id,
      postId: postId,
      content,
    });
    console.log(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ minWidth:"350px"}}
      >
        <DialogTitle id="scroll-dialog-title">Comments</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {comments.length === 0 ? (
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                No Comment added
              </DialogContentText>
            ) : (
              comments.map((comment) => (
                <Comments commentId={comment} key={comment} />
              ))
            )}
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <TextField fullWidth onChange={(e) => setContent(e.target.value)} />
          <Button onClick={handleComment} variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
