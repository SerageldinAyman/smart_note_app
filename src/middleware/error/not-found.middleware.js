import AppError from "../../utils/appError.js";

export const notFound = (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};

export default notFound;
