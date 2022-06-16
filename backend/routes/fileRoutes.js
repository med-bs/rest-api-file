const express = require("express");
const router = express.Router();
const {
  getAllFiles,
  getFilebyId,
  createFile,
  updateFile,
  deleteFile,
} = require("../controllers/fileControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllFiles).post(protect, createFile);

router
  .route("/:id")
  .get(protect, getFilebyId)
  .put(protect, updateFile)
  .delete(protect, deleteFile);

module.exports = router;
