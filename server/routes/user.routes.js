import express from "express";
import {
  deleteUser,
  editCoverPicture,
  editProfilePicture,
  editUser,
  getAllusers,
  getUser,
  verified,
} from "../controller/user.controller.js";
import upload from "../middleware/multer.middleware.js";

const userRouter = express.Router();

userRouter.get("/allUsers", getAllusers);
userRouter.get("/:id", getUser);
userRouter.put("/verified/:id", verified);
userRouter.put("/:id", editUser);
userRouter.put("/avatar/:id", upload.single("image"), editProfilePicture);
userRouter.put("/cover/:id", upload.single("image"), editCoverPicture);
userRouter.delete("/:id", deleteUser);

export default userRouter;
