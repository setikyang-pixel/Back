import Event from "../models/Event.js";
import Review from "../models/Review.js";
import AppError from "../utils/appError.js";

export const createReview = async (eventId, userId, data) => {
  const event = await Event.findById(eventId);
  if (!event) throw new AppError("Event is not defined!!!", 403);
  const user = event.attendees.some((item) => item.user.toString() === userId);
  if (!user) throw new AppError("You can only review events you attended", 403);
  if (event.endTime > new Date()) throw new AppError("Event has ended!!!", 403);
  try {
    const review = await Review.create({
      event: eventId,
      user: userId,
      ...data,
    });
    return { review };
  } catch (err) {
    if (err.code === 11000) {
      throw new AppError("You have already reviewed this event", 409);
    }
    throw err;
  }
};

export const getReviewsByEventId = async (eventId) => {
  const review = await Review.find({ event: eventId }).populate("user", "name");
  return { review };
};
