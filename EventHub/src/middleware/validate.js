import AppError from "../utils/appError.js";

export const validate = (schema, src = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[src], {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const message = error.details[0].message;
      return next(new AppError(message, 400));
    }
    if (src === "query") {
      Object.keys(req.query).forEach((key) => delete req.query[key]);
      Object.assign(req.query, value);
    } else req[src] = value;
    next();
  };
};
