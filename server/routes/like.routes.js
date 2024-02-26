import express from "express";
import { checkLike, getLikes, toggleLike } from "../controller/like.controller.js";

const likeRouter = express.Router();


likeRouter.get("/", getLikes);
likeRouter.post("/check/:postId", checkLike)
likeRouter.post("/:postId", toggleLike);

export default likeRouter;
