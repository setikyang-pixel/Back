import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
} from "../controllers/orderController.js";
const order = express.Router();

order.get("/", getAllOrders);
order.get("/:id", getOrderById);
order.post("/checkout", createOrder);
order.patch("/:id/status", updateOrder);

export default order;
