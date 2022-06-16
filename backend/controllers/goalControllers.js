const Goal = require("../models/goalModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// @desc Get goals
// @route GET /api/goal
// @access Private

const getAllGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// @desc Get goal
// @route GET /api/goal
// @access Private

const getGoalbyId = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  res.status(200).json(goal);
});

// @desc Post goal
// @route POST /api/goal
// @access Private

const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc  Put goal
// @route PUT /api/goal/:id
// @access Private

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  const updatedgoal = await Goal.findById(req.params.id);
  res.status(200).json(updatedgoal);
});

// @desc Delete goal
// @route DELETE /api/goal/:id
// @access Private

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();
  res.status(200).json(goal);
});

module.exports = {
  getAllGoals,
  getGoalbyId,
  createGoal,
  updateGoal,
  deleteGoal,
};
