const express = require("express");
const router = express.Router();
const {
  getAllGoals,
  getGoalbyId,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllGoals).post(protect, createGoal);

router
  .route("/:id")
  .get(protect, getGoalbyId)
  .put(protect, updateGoal)
  .delete(protect, deleteGoal);

module.exports = router;
