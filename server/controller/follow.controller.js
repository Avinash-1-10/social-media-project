import User from "../model/user.model.js";

const followToggle = async (req, res) => {
  console.log("I")
  try {
    const { userId } = req.body;
    const { followingId } = req.params;

    const user = await User.findById(userId);
    const fUser = await User.findById(followingId);

    if (!user || !fUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = user.following.includes(followingId);
    if (isFollowing) {
      // If already following, unfollow
      await User.findByIdAndUpdate(userId, {
        $pull: { following: followingId },
      });
      await User.findByIdAndUpdate(followingId, {
        $pull: { followers: userId },
      });
    } else {
      // If not following, follow
      await User.findByIdAndUpdate(userId, {
        $push: { following: followingId },
      });
      await User.findByIdAndUpdate(followingId, {
        $push: { followers: userId },
      });
      await User.findByIdAndUpdate(followingId, {
        $push: { followRequests: userId },
      });

      // Check if fUser has userId in followRequests array, if yes, remove it
      const owner = await User.findById(userId);
      if (owner.followRequests.includes(followingId)) {
        await User.findByIdAndUpdate(userId, {
          $pull: { followRequests: followingId },
        });
        await User.findByIdAndUpdate(followingId, {
          $pull: { followRequests: userId },
        });
      }
    }

    res.status(200).json({ message: "Follow status updated successfully" });
  } catch (error) {
    console.error("Error toggling follow status:", error);
    res.status(500).json({ message: "Failed to toggle follow status" });
  }
};


const checkFollow = async (req, res) => {
  try {
    const { userId } = req.body;
    const { followingId } = req.params;

    const user = await User.findById(userId);
    //   console.log(user)
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isFollowing = user.following.includes(followingId);
    res.json({ following: isFollowing });
  } catch (error) {
    console.error("Error checking follow status:", error);
    res.status(500).json({ message: "Failed to check follow status" });
  }
};

const getFollowRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const requests = await User.findById(id)
      .populate({
        path: "followRequests",
        select: {
          username: 1,
          firstName: 1,
          lastName: 1,
          followers: 1,
          profilePicture: 1,
        },
      })
      .select({
        username: 1,
      });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { followToggle, checkFollow, getFollowRequests };
