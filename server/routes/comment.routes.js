import express from "express";
import { addComment, getComments, getSingleComment } from "../controller/comment.controller.js";


const commentRouter = express.Router();

commentRouter.get("/:postId", getComments);
commentRouter.post("/", addComment);
commentRouter.get("/user/:commentId", getSingleComment)

export default commentRouter;