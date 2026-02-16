const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
