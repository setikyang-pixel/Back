import express from "express";
import prisma from "../config/db.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cartController.js";
const cart = express.Router();
cart.get("/",  getCart);
cart.post("/items", addToCart);
cart.put("/items/:id", updateCartItem);
cart.delete("/items/:id", removeFromCart);

export default cart;
