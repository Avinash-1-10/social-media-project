import Comment from "../model/comment.model.js";
import Post from "../model/post.model.js";

const getComments = async (req, res) => {
  // .populate("comments");
  try {
    const { postId } = req.params;
    // console.log(postId)
    const post = await Post.findById(postId);
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  console.log("Hi");
  try {
    const { userId, postId, content } = req.body;
    const newComment = new Comment({
      user: userId,
      post: postId,
      content: content,
    });

    await newComment.save();
    const post = await Post.findById(postId);
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleComment = async (req, res) => {
    
  try {
    const { commentId } = req.params;
    // console.log(commentId)
    const comment = await Comment.findById(commentId).populate("user");
    console.log(comment)
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getComments, addComment, getSingleComment };
