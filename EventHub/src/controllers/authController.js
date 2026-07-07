import asyncHandler from "../middleware/asyncHandler.js";
import {
  registerService,
  loginService,
  logoutService,
  refreshService,
} from "../services/authService.js";

const registerController = asyncHandler(async (req, res) => {
  const { newUser, tokenRefresh, tokenAccess } = await registerService(
    req.body,
  );
  res.status(201).json({ newUser, tokenRefresh, tokenAccess });
});

const loginController = asyncHandler(async (req, res) => {
  const { user, tokenRefresh, tokenAccess } = await loginService(req.body);
  res.status(200).json({ user, tokenRefresh, tokenAccess });
});

const logoutController = asyncHandler(async (req, res) => {
  const id = req.user.id;
  await logoutService(id);
  res.status(200).json({ message: "Logged out successfully" });
});

const refreshController = asyncHandler(async (req, res) => {
  const { tokenRefresh, tokenAccess } = await refreshService(
    req.body.refreshToken,
  );
  res.status(200).json({ tokenRefresh, tokenAccess });
});

export {
  registerController,
  loginController,
  logoutController,
  refreshController,
};
