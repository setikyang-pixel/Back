import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { authentication, authorize } from "../middleware/auth.js";
import { createReviewSchema } from "../validations/reviewValidation.js";
import {
  getReviewsController,
  createReviewController,
} from "../controllers/reviewController.js";
const review = Router({ mergeParams: true });

review.get("/", getReviewsController);
review.post(
  "/",
  authentication,
  authorize("member"),
  validate(createReviewSchema),
  createReviewController,
);

export default review;
