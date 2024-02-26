import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendMail from "../utils/mail.js";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  console.log(req.body)
  try {
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
      username,
      email,
      firstName:firstname,
      lastName:lastname,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid email / password" });
  }
  const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
    httpOnly: true,
    sameSite: "lax",
  });
  return res
    .status(200)
    .json({ message: "Successfully logged in", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(404).json({ message: "No cookies found" });
  }
  const token = cookies.split("=")[1];
  console.log("verify", token);
  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token has expired. Please log in again." });
      } else {
        return res.status(400).json({ message: "Invalid Token" });
      }
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    // console.log(existingUser)
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const pass = `${existingUser.role}@${Math.floor(Math.random()*10e4)}${existingUser.username}`;
    const hashedPassword = bcrypt.hashSync(pass);
    existingUser.password = hashedPassword;
    await existingUser.save();
    sendMail(email,"Password Updated", `Your new password is: ${pass}`);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const logout = (req, res) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

// const refreshToken = (req, res, next) => {
//   const cookies = req.headers.cookie;
//   const prevToken = cookies.split("=")[2];

//   if (!prevToken) {
//     return res.status(400).json({ message: "Couldn't find token" });
//   }
//   jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.status(403).json({ message: "Authentication failed" });
//     }
//     res.clearCookie(`${user.id}`);
//     req.cookies[`${user.id}`] = "";

//     const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
//       expiresIn: "35s",
//     });

//     console.log("regenrated token\n", token);

//     res.cookie(String(user.id), token, {
//       path: "/",
//       expires: new Date(Date.now() + 1000 * 30), //30 seconds
//       httpOnly: true,
//       sameSite: "lax",
//     });
//     req.id = user.id;
//     next();
//   });
// };

export { signup, login, verifyToken, logout, forgotPassword };
