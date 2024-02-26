import express from "express";
import {
  forgotPassword,
  login,
  logout,
  // refreshToken,
  signup,
  verifyToken,
} from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", verifyToken, logout);
authRouter.post("/forgotpassword", forgotPassword);

export default authRouter;
