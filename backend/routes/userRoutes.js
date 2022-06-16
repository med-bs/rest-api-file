const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getThisUser,
} = require("../controllers/userControllers");

const { protect } = require("../middleware/authMiddleware");

router.post("/", register);
router.post("/login", login);
//proteger la route avec jwt
router.get("/me", protect, getThisUser);

module.exports = router;
