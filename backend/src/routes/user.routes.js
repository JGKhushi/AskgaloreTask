const express = require("express");
const router = express.Router();

const {
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const { protect } = require("../middlewares/auth.middleware");

// =========================
// GET USER BY ID
// =========================
router.get("/:id", protect, getUserById);

// =========================
// UPDATE USER
// =========================
router.put("/:id", protect, updateUser);

// =========================
// DELETE USER
// =========================
router.delete("/:id", protect, deleteUser);

module.exports = router;
