import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    creationTime: {
      type: Number,
      required: true,
    },
    expiryTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

storySchema.pre("save", function (next) {
  this.expiryTime = this.creationTime + 24 * 3600 * 1000;
  next();
});

const Story = mongoose.model("Story", storySchema);

export default Story;
