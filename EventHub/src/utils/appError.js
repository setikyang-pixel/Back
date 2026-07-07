class AppError extends Error {
  constructor(message, code = 500) {
    super(message);
    this.status = code;
    this.details = undefined;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
