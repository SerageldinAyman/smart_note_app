import AppError from "../../utils/appError.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return next(new AppError(`Validation error: ${messages.join(", ")}`, 400));
  }

  next();
};
