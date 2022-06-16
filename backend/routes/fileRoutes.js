const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  getAllFiles,
  getFilebyId,
  createFile,
  updateFile,
  deleteFile,
} = require("../controllers/fileControllers");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getAllFiles)
  .post([protect, upload.single("file")], createFile);

router
  .route("/:id")
  .get(protect, getFilebyId)
  .put(protect, updateFile)
  .delete(protect, deleteFile);

module.exports = router;
