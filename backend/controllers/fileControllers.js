const File = require("../models/fileModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

// @desc Get files
// @route GET /api/file
// @access Private

const getAllFiles = asyncHandler(async (req, res) => {
  const files = await File.find({ user: req.user.id });

  res.status(200).json(files);
});

// @desc Get file
// @route GET /api/file/;id
// @access Private

const getFilebyId = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) {
    res.status(400);
    throw new Error("File not found");
  }
  res.status(200).json(File);
});

// @desc Post
// @route POST /api/file
// @access Private

const createFile = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add title field");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("Please add file");
  }

  const file = await File.create({
    title: req.body.title,
    user: req.user.id,
    link: req.file.path,
  });
  res.status(200).json(file);
});

// @desc  Put File
// @route PUT /api/file/:id
// @access Private

const updateFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add text field");
  }

  if (!file) {
    res.status(400);
    throw new Error("File not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the file user
  if (file.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedFile = await File.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  const updatedfile = await File.findById(req.params.id);
  res.status(200).json(updatedfile);
});

// @desc Delete File
// @route DELETE /api/file/:id
// @access Private

const deleteFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    res.status(400);
    throw new Error("File not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the file user
  if (file.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  try {
    fs.unlinkSync(file.link);
  } catch (err) {
    console.error(err);
  }

  await file.remove();
  res.status(200).json(file);
});

module.exports = {
  getAllFiles,
  getFilebyId,
  createFile,
  updateFile,
  deleteFile,
};
