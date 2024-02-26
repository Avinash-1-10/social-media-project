import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  createStatus: "idle",
  editStatus: "idle",
  deleteStatus: "idle",
};

const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/post");
    return data;
  } catch (error) {
    throw Error("Failed to fetch posts");
  }
});

const createPost = createAsyncThunk("posts/createPost", async (postData) => {
  const formData = new FormData();
  formData.append("image", postData.image);
  formData.append("content", postData.content);
  formData.append("user", postData.user);
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    throw Error("Failed to create post");
  }
});

const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, editedPost }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/post/${id}`,
        editedPost
      );
      return data;
    } catch (error) {
      throw Error("Failed to edit post");
    }
  }
);

const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    const { data } = await axios.delete(`http://localhost:8080/api/post/${id}`);
    return data;
  } catch (error) {
    throw Error("Failed to delete post");
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "idle";
      })
      .addCase(getPosts.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(createPost.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createPost.fulfilled, (state) => {
        state.createStatus = "idle";
      })
      .addCase(createPost.rejected, (state) => {
        state.createStatus = "idle";
      })
      .addCase(editPost.pending, (state) => {
        state.editStatus = "loading";
      })
      .addCase(editPost.fulfilled, (state) => {
        state.editStatus = "idle";
      })
      .addCase(editPost.rejected, (state) => {
        state.editStatus = "idle";
      })
      .addCase(deletePost.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.deleteStatus = "idle";
      })
      .addCase(deletePost.rejected, (state) => {
        state.deleteStatus = "idle";
      });
  },
});

export { createPost, getPosts, deletePost, editPost };
export default postSlice.reducer;
