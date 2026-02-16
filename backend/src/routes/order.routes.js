const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

const { protect } = require("../middlewares/auth.middleware");

// =========================
// CREATE ORDER
// =========================
router.post("/", protect, createOrder);

// =========================
// GET ALL ORDERS (only logged-in user)
// =========================
router.get("/", protect, getAllOrders);

// =========================
// GET ORDER BY ID
// =========================
router.get("/:id", protect, getOrderById);

// =========================
// UPDATE ORDER
// =========================
router.put("/:id", protect, updateOrder);

// =========================
// DELETE ORDER
// =========================
router.delete("/:id", protect, deleteOrder);

module.exports = router;
