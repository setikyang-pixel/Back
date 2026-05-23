import AppError from "../utils/AppError.js";

const ErrorHandling = (err, req, res, next) => {
  let message = err.message || "Error data!!!";
  let status = err.status || 500;
  if (message === "Invalid!!!") {
    status = 400;
    message = "Invalid Arguments!!!";
  }
  if (err.message === "Json Web Token Error!!!") {
    status = 401;
    message = "Token is Invalid!!!";
  }
  if (err.message === "Invalid file!!!") {
    status = 500;
    message = "Invalid argument pases on file";
  }
  if(err.message === "Unauthorized"){
    status = 401;
    message = "Unauthorized!!!";
  }
  if (err instanceof AppError)
    return res.status(err.status).json({ message: err.message });
  res.status(500).send("Unexpected Error!!!");
};

export default ErrorHandling