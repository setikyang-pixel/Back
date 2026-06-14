import express from "express";
import {getAllCategories,createCategory,deleteCategory} from "../controllers/categoryController.js";
import { adminOnly } from "../middleware/onlyAdmin.js";
const categories = express.Router();

categories.get("/",getAllCategories);
categories.post("/",adminOnly,createCategory);
categories.delete("/:id",adminOnly,deleteCategory);

export default categories;
