import { Router } from "express";
import auth from "./auth.js";
import products from "./products.js";
import categories from "./categories.js";
import cart from "./cart.js";
import order from "./orders.js";
import reviews from "./reviews.js";
const fullEcomerce = Router();

fullEcomerce.use("/auth", auth);
fullEcomerce.use("/products", products);
fullEcomerce.use("/categories", categories);
fullEcomerce.use("/cart", cart);
fullEcomerce.use("/orders", order);
fullEcomerce.use("/", reviews);

export default fullEcomerce;