
const router = require("express").Router();
const Comment = require("../models/comment");


// Create a new comment
router.post("/", async (req, res) => {
  try {
    const { userId, postId, text } = req.body;
    const comment = new Comment({ userId, postId, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get comments for a specific post
router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId }).populate("userId", "username");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;