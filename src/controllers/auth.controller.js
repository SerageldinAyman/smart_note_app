import User from "../../models/user.model.js";
import OTP from "../../models/otp.model.js";
import RevokedToken from "../../models/revokedToken.model.js";
import {
  createAndSendToken,
  sendOTPEmail,
} from "../../services/auth.service.js";
import { generateOTP } from "../../utils/generateOTP.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../../validations/auth.validation.js";

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res, next) => {
  // Validate request body
  const { error } = registerSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User already exists", 400));
  }

  // Create new user
  const user = await User.create({ email, password });

  // Generate and send JWT token
  createAndSendToken(user, 201, res);
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res, next) => {
  // Validate request body
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { email, password } = req.body;

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  // Generate and send JWT token
  createAndSendToken(user, 200, res);
});

/**
 * @desc    Logout user
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("No token provided", 400));
  }

  // Add token to revoked list
  await RevokedToken.create({ token });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

/**
 * @desc    Upload profile picture
 * @route   PATCH /api/v1/auth/upload-profile-pic
 * @access  Private
 */
export const uploadProfilePic = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("Please upload a file", 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profilePic: req.file.filename },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        email: user.email,
        profilePic: user.profilePic,
      },
    },
  });
});

/**
 * @desc    Forgot password - send OTP to email
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res, next) => {
  // Validate request body
  const { error } = forgotPasswordSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("No user found with that email", 404));
  }

  // Generate OTP
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

  // Save OTP to database
  await OTP.create({ email, otp, expiresAt });

  // Send OTP via email
  await sendOTPEmail(email, otp);

  res.status(200).json({
    status: "success",
    message: "OTP sent to email",
  });
});

/**
 * @desc    Reset password with OTP
 * @route   POST /api/v1/auth/reset-password
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Validate request body
  const { error } = resetPasswordSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { email, otp, newPassword } = req.body;

  // Find the OTP record
  const otpRecord = await OTP.findOne({ email, otp });

  // Check if OTP exists and is not expired
  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    return next(new AppError("Invalid or expired OTP", 400));
  }

  // Find user and update password
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("No user found with that email", 404));
  }

  user.password = newPassword;
  await user.save();

  // Delete the used OTP
  await OTP.deleteOne({ _id: otpRecord._id });

  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
  });
});
