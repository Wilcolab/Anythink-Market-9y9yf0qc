/**
 * Express router for handling comment-related API endpoints.
 * @module routes/api/comments
 * @requires express
 * @requires mongoose
 */

const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

/**
 * GET endpoint to retrieve all comments from the database.
 * @route GET /
 * @returns {Object[]} 200 - Array of comment objects
 * @returns {Object} 500 - Error object with error message
 * @returns {string} 500.error - Error message indicating failed fetch operation
 */
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

/**
 * DELETE endpoint to remove a comment by its ID.
 * @route DELETE /:id
 * @param {string} req.params.id - The MongoDB ObjectId of the comment to delete
 * @returns {Object} 200 - Success object with confirmation message
 * @returns {string} 200.message - Success message confirming deletion
 * @returns {Object} 500 - Error object with error message
 * @returns {string} 500.error - Error message indicating failed delete operation
 */
router.delete("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});
