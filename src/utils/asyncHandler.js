/**
 * Wraps async functions to catch errors and forward to error middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error("AsyncHandler caught error:", err);
    next(err);
  });
};

export default asyncHandler;
