const express = require("express");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");

const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

// =========================
// GLOBAL MIDDLEWARES
// =========================

// Parse JSON body
app.use(express.json());

// =========================
// ROUTES
// =========================

app.get("/", (req, res) => {
  res.send("Backend is working properly");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// =========================
// GLOBAL ERROR HANDLER
// =========================

app.use(errorHandler);

module.exports = app;
