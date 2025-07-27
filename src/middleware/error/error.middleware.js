import logger from "../../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log error details
  logger.error({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    status: err.statusCode,
    path: req.path,
    method: req.method,
  });

  // Send response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
