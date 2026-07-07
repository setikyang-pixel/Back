import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../utils/passwordHash.js";

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["member", "organizer"],
    default: "member",
  },
  refreshToken: {
    type: String,
    select: false,
  },
  refreshTokenExpires: {
    type: Date,
  },
});

User.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hashPassword(this.password);
});

User.methods.toJSON = function () {
  let newUser = this.toObject();
  delete newUser.password;
  delete newUser.refreshToken;
  return newUser;
};

export default mongoose.model("User", User);
