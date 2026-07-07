import asyncHandler from "../middleware/asyncHandler.js";
import review from "../routes/reviewRoutes.js";
import {
  getReviewsByEventId,
  createReview,
} from "../services/reviewService.js";

export const getReviewsController = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;
  const data = req.body;
  const review = await getReviewsByEventId(eventId, userId, data);
  res.status(201).json({ success: true, data: event });
});

export const createReviewController = asyncHandler(async (req, res) => {
      console.log("aaa");

  const eventId = req.params.id;
  const review = await createReview(eventId);
  res.status(201).json({ success: true, data: review });
});
