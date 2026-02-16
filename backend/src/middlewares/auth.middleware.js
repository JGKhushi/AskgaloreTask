const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ If no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Find user from token payload
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 5️⃣ Attach user to request
    req.user = {
      id: user._id,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
