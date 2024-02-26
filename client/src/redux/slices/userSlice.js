import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  signupStatus: "idle",
  forgotPassStatus: "idle",
  token: null,
  users: null,
};

// Register api call
export const register = createAsyncThunk("user/signup", async (userData) => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/signup",
    userData
  );
  return response.status;
});

// Forgot Password api call
export const forgotPassword = createAsyncThunk(
  "user/forgotpassword",
  async (email) => {
    const response = await axios.post(
      "http://localhost:8080/api/auth/forgotpassword",
      userData
    );
    return response.status;
  }
);

// Log out api call;
export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.post("http://localhost:8080/api/auth/logout");
  return response.status;
});

export const editUser = createAsyncThunk("user/editUser", async (userData) => {
  console.log(userData);
  const { data } = await axios.put(
    `http://localhost:8080/api/user/${userData.id}`,
    userData
  );
  return data;
});
export const getAllusers = createAsyncThunk("user/getAllUsers", async () => {
  const { data } = await axios.get(`http://localhost:8080/api/user/allUsers`);
  console.log("allusers", data);
  return data;
});

export const followRequests = createAsyncThunk("user/followRequests", async (id) => {
  const { data } = await axios.get(`http://localhost:8080/api/user/followRequests/${id}`);
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("userData", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editUser.fulfilled, (state) => {
        console.log("User is edited");
      })
      .addCase(getAllusers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllusers.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
        console.log("all users", action.payload);
      })
      .addCase(getAllusers.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
