import express from "express";
import { createPost, deletePost, editPost, getAllPosts, getPost, getUserPosts } from "../controller/post.controller.js";
import upload from "../middleware/multer.middleware.js"
const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:postId", getPost)
postRouter.post("/", upload.single("image"), createPost);
postRouter.put("/:id", editPost);
postRouter.delete("/:postId", deletePost);
postRouter.get("/user/:userId", getUserPosts)


export default postRouter;
