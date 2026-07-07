import AppError from "../utils/appError.js";
import { verifyToken } from "../utils/token.js";

export const authentication = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.split(" ")[1])
    throw new AppError("Authorization header missing or invalid", 401);
  try {
    const token = auth.split(" ")[1];
    const checkedToken = verifyToken(token);
    req.user = checkedToken;    
    next();
  } catch (err) {
    return next(new AppError("Invalid or expired token!!!", 401));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    console.log(roles,req.user.role);
    
    if (!roles.includes(req.user.role))
      return next(new AppError("Unauthorized action!!!", 403));
    next();
  };
};
