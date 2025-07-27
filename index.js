import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import authRoutes from "./src/routes/auth.js";
import noteRoutes from "./src/routes/notes.js";

// Import middleware
import {
  errorHandler,
  notFoundHandler,
} from "./src/middleware/errorHandler.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Security middleware
 */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
});
app.use(limiter);

/**
 * Body parsing middleware
 */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/**
 * Static files middleware for uploaded files
 */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/**
 * Database connection
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

/**
 * Routes
 */
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

/**
 * Health check endpoint
 */
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Smart Note App is running",
    timestamp: new Date().toISOString(),
  });
});

/**
 * 404 handler for undefined routes
 */
app.use(notFoundHandler);

/**
 * Global error handling middleware (must be last)
 */
app.use(errorHandler);

/**
 * Start server
 */
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
