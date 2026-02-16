const Order = require("../models/order.model");

// =========================
// CREATE ORDER
// =========================
exports.createOrder = async (req, res, next) => {
  try {
    const { productName, price } = req.body;

    if (!productName || !price) {
      return res.status(400).json({
        success: false,
        message: "Product name and price are required",
      });
    }

    const order = await Order.create({
      productName,
      price,
      user: req.user.id, // comes from auth middleware
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// =========================
// GET ALL ORDERS (ONLY LOGGED-IN USER)
// =========================
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// =========================
// GET ORDER BY ID
// =========================
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Ownership check
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this order",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// =========================
// UPDATE ORDER
// =========================
exports.updateOrder = async (req, res, next) => {
  try {
    const { productName, price } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Ownership check
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this order",
      });
    }

    if (productName) order.productName = productName;
    if (price) order.price = price;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// =========================
// DELETE ORDER
// =========================
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Ownership check
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this order",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
