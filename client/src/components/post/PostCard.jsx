import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import axios from "axios";
import { tokens } from "../../theme";
import FollowToggle from "./FollowToggle";
import CommentSection from "../comment/CommentSection";
import VerifiedIcon from "@mui/icons-material/Verified";
import profilePic from "../../assets/profile.png"

const PostCard = ({ postData }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [post, setPost] = useState(postData);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [showComment, setShowComment] = useState(false);
  const userId = userData._id;
  const followingId = post.user._id;

  const getPost = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/post/${post._id}`
    );
    setPost(data);
  };

  const checkFollowing = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/follow/check/${followingId}`,
        { userId }
      );
      setIsFollowing(data.following);
    } catch (error) {
      console.error("Error checking following status:", error);
    }
  };

  const checkLiked = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/like/check/${post._id}`,
        { userId }
      );
      setLiked(data.liked);
    } catch (error) {
      console.error("Failed to check liked status:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLikeCount = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/post/${post._id}`
      );
      setLikeCount(data.likes.length);
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  const handleLike = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:8080/api/like/${post._id}`, {
        userId,
      });
      checkLiked();
      getLikeCount();
    } catch (error) {
      console.error("Failed to like/dislike:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/follow/${followingId}`,
        { userId }
      );
      // console.log(data);
      checkFollowing();
    } catch (error) {
      console.log("failed to follow/unfollow");
    }
  };

  const handleComment = () => {
    setShowComment(!showComment);
  };

  useEffect(() => {
    checkLiked();
    checkFollowing();
  }, []);

  return (
    <>
      <Card sx={{ width: "60%", minWidth: "350px" }}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar
            sx={{ height: "60px", width: "60px" }}
            src={post.user.profilePicture || profilePic}
          />
          <Container>
            <Box sx={{display:"flex", alignItems:"center", gap:1}}>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {post.user.firstName} {post.user.lastName}
              </Typography>
              {post.user.verified && <VerifiedIcon sx={{color:"#00cc00"}}/>}
            </Box>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {post?.user?.followers?.length}{" "}
              {post?.user?.followers?.length === 1 ? "follower" : "followers"}
            </Typography>
          </Container>
          {post.user._id !== userId && (
            <FollowToggle
              isFollowing={isFollowing}
              handleFollow={handleFollow}
            />
          )}
        </CardContent>
        <CardContent>
          <Typography variant="body1" mb={1} mt={-2}>
            {post.content}
          </Typography>
          <CardMedia
            component="img"
            height="50%"
            sx={{ objectFit: "cover", borderRadius: 2 }}
            image={post.image}
            alt="Post Image"
          />
        </CardContent>
        <CardContent
          sx={{ mt: -2, display: "flex", alignItems: "center", gap: 1 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="like"
              onClick={handleLike}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <FavoriteIcon sx={{ color: liked ? "#ff4081" : "grey" }} />
              )}
            </IconButton>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="comment"
              sx={{ color: colors.blueAccent[500] }}
              onClick={handleComment}
            >
              <CommentOutlinedIcon />
            </IconButton>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {post.comments.length}{" "}
              {post.comments.length === 1 ? "comment" : "comments"}
            </Typography>
          </Box>
          <IconButton
            color="primary"
            aria-label="save"
            sx={{ marginLeft: "auto", color: colors.blueAccent[500] }}
          >
            <BookmarkBorderIcon />
          </IconButton>
        </CardContent>
      </Card>
      <CommentSection
        open={showComment}
        setOpen={setShowComment}
        postId={postData._id}
      />
    </>
  );
};

export default PostCard;
