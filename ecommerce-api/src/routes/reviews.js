import express from "express";
import {
  getAllReviews,
  createReview,
  deleteReview,
} from "../controllers/reviewController.js";
const reviews = express.Router();

reviews.get("/products/:id/reviews", getAllReviews);
reviews.post("/products/:id/reviews",createReview);
reviews.delete("/reviews/:id", deleteReview);

export default reviews;