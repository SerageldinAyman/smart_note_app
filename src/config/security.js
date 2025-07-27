import helmet from "helmet";
import cors from "cors";
import { authLimiter, apiLimiter } from "../middlewares/rateLimiter.js";
import logger from "../utils/logger.js";

export const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export const setupSecurity = (app) => {
  // Security headers
  app.use(helmet());

  // CORS
  app.use(cors(corsOptions));

  // Rate limiting
  app.use("/api/v1/auth", authLimiter);
  app.use("/api/v1", apiLimiter);

  logger.info("Security middleware initialized");
};
