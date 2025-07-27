import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  uploadProfilePic,
} from "../controllers/auth/auth.controller.js";
import { protect } from "../middlewares/auth/auth.middleware.js";
import { validate } from "../middlewares/validation/validate.middleware.js";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validations/auth.validation.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", protect, logout);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.patch(
  "/upload-profile-pic",
  protect,
  upload.single("profilePic"),
  uploadProfilePic
);

export default router;
