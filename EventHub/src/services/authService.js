import { env } from "../config/env.js";
import User from "../models/User.js";
import AppError from "../utils/appError.js";
import { verifyPassword } from "../utils/passwordHash.js";
import { createToken, hashToken, verifyToken } from "../utils/token.js";
import ms from "ms";

export const registerService = async ({ name, email, password, role }) => {
  const user = await User.findOne({ email });
  if (user) throw new AppError("Double registration!!!", 409);
  const newUser = await User.create({ name, email, password, role });
  const tokenAccess = createToken(
    { id: newUser._id, email, role },
    env.jwtExpiresInAccess,
  );
  const tokenRefresh = createToken(
    { id: newUser._id, email, role },
    env.jwtExpiresInRefresh,
  );

  newUser.refreshToken = hashToken(tokenRefresh);
  newUser.refreshTokenExpires = new Date(
    Date.now() + ms(env.jwtExpiresInRefresh),
  );
  await newUser.save();

  return { newUser, tokenRefresh, tokenAccess };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError("There is no such account!!!", 400);
  const authenticate = await verifyPassword(password, user.password);
  if (!authenticate) throw new AppError("Invalid password", 401);
  const tokenAccess = createToken(
    { id: user._id, email, role: user.role },
    env.jwtExpiresInAccess,
  );
  const tokenRefresh = createToken(
    { id: user._id, email, role: user.role },
    env.jwtExpiresInRefresh,
  );

  user.refreshToken = hashToken(tokenRefresh);
  user.refreshTokenExpires = new Date(Date.now() + ms(env.jwtExpiresInRefresh));
  await user.save();
  return { user, tokenRefresh, tokenAccess };
};

export const logoutService = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, {
    refreshToken: "",
    refreshTokenExpires: null,
  });
  if (!user) throw new AppError("There is no such account!!!", 400);
  return true
};

export const refreshService = async (token) => {
  const idUser = verifyToken(token).id;  
  const user = await User.findById(idUser).select("+refreshToken");
  if (!user) throw new AppError("User not found", 401);
  console.log(user);
  
  if (hashToken(token) !== user.refreshToken)
    throw new AppError("Token are not equal!!!", 401);
  const newRefreshToken = createToken(
    { id: user._id, email: user.email, role: user.role },
    env.jwtExpiresInRefresh,
  );
  const newAccessToken = createToken(
    { id: user._id, email: user.email, role: user.role },
    env.jwtExpiresInAccess,
  );
  const newToken = hashToken(newRefreshToken);
  await User.findByIdAndUpdate(user._id, {
    refreshToken: newToken,
    refreshTokenExpires: new Date(Date.now() + ms(env.jwtExpiresInRefresh)),
  });
  return { tokenAccess: newAccessToken, tokenRefresh: newRefreshToken };
};
