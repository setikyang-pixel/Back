import express from "express";
import prisma from "../config/db.js";
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController.js";
import { adminOnly } from "../middleware/onlyAdmin.js";

const products = express.Router();

products.get("/", getAllProducts);
products.get("/:id", getProductById);
products.post("/", adminOnly, createProduct);
products.put("/:id", adminOnly, updateProduct);
products.delete("/:id", adminOnly, deleteProduct);

export default products;