import jwt from "jsonwebtoken";
import asyncHandler from "../../utils/asyncHandler.js";
import User from "../../models/user.model.js";
import RevokedToken from "../../models/revokedToken.model.js";
import AppError from "../../utils/appError.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Not authenticated", 401));
  }

  const isRevoked = await RevokedToken.exists({ token });
  if (isRevoked) {
    return next(new AppError("Token revoked", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY, {
    algorithms: ["RS256"],
  });

  const user = await User.findById(decoded.userId);
  if (!user) {
    return next(new AppError("User no longer exists", 401));
  }

  req.user = user;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Unauthorized access", 403));
    }
    next();
  };
};
