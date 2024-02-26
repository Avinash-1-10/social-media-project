import Like from "../model/like.model.js";
import Post from "../model/post.model.js";

const getLikes = async (req, res) => {
  try {
    const likes = await Like.find();
    res.json(likes);
  } catch (error) {}
};

// Controller to add or remove a like
const toggleLike = async (req, res) => {
  console.log("done");
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const existingLike = await Like.findOne({ user: userId, post: postId });
    console.log(existingLike);

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: existingLike._id },
      });

      res.json({ message: "Like removed successfully" });
    } else {
      const newLike = new Like({ user: userId, post: postId });
      await newLike.save();
      await Post.findByIdAndUpdate(postId, { $push: { likes: newLike._id } });

      res
        .status(201)
        .json({ message: "Like added successfully", like: newLike });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to toggle like" });
  }
};

const checkLike = async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;
  // console.log(userId, postId)
  try {
    // Check if the user liked the post
    const like = await Like.findOne({ user: userId, post: postId });
    // console.log(userId, postId)
    // console.log(like)

    res.json({ liked: like !== null }); // Return true if the like exists, false otherwise
  } catch (error) {
    console.error("Error checking like status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { toggleLike, getLikes, checkLike };
