import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { setupSecurity } from "./config/security.js";
import connectDB from "./config/db.js";
import connectRedis from "./config/redis.js";
import { notFound } from "./middlewares/error/not-found.middleware.js";
import { errorHandler } from "./middlewares/error/error.middleware.js";
import routes from "./routes/index.js";
import logger from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Database connections
connectDB();
connectRedis();

// Security middleware
setupSecurity(app);

// Body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/v1", routes);

// 404 Handler
app.use(notFound);

// Error handler (must be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;
