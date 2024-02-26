import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import UserPost from "./UserPost";

const ProfilePosts = () => {
  const user =
    useSelector((state) => state.user.user) ||
    JSON.parse(localStorage.getItem("userData"));
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false)

  const getUserPosts = async (req, res) => {
    const userId = user._id;
    const { data } = await axios.get(
      `http://localhost:8080/api/post/user/${userId}`
    );
    setPosts(data);
  };



  useEffect(() => {
    getUserPosts();
  },[reload]);
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {posts.map((p) => (
        <UserPost p={p} key={p._id} setReload={setReload}/>
      ))}
    </div>
  );
};

export default ProfilePosts;
