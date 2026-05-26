import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Protect routes — verify JWT access token
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Role-based access control
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. ${req.user.role} role is not authorized.`,
      });
    }
    next();
  };
};

// Check if vendor is approved by admin
export const vendorApproved = (req, res, next) => {
  if (req.user.role === "vendor" && !req.user.isApproved) {
    return res.status(403).json({
      message: "Your vendor account is pending admin approval.",
    });
  }
  next();
};
