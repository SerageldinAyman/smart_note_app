import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendOTPEmail } from "./email.service.js";
import logger from "../utils/logger.js";

export const createAndSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Remove sensitive data
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

export const initiatePasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return false;

  const otp = generateOTP();
  await sendOTPEmail(email, otp);
  return otp;
};
