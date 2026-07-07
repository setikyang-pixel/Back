import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
} from "../controllers/authController.js";
import { authentication } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  loginSchema,
  refreshSchema,
  registerSchema,
} from "../validations/authValidation.js";

const auth = Router();

auth.post("/register", validate(registerSchema), registerController);
auth.post("/login", validate(loginSchema), loginController);
auth.post("/refresh", validate(refreshSchema), refreshController);
auth.post("/logout", authentication, logoutController);

export default auth;
