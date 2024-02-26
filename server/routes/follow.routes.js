import express from "express";
import { checkFollow, followToggle, getFollowRequests } from "../controller/follow.controller.js";

const followRouter = express.Router();


followRouter.post("/check/:followingId", checkFollow)
followRouter.put("/:followingId", followToggle);
followRouter.get("/requests/:id", getFollowRequests);

export default followRouter;
