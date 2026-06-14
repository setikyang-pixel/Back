import prisma from "../config/db.js";
import { verifyJWT } from "../utils/jwt.js";

const getAllReviews = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await prisma.review.findMany({
      where: { id },
    });
    res.send(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const createReview = async (req, res) => {
  try {
    const { id: userId } = verifyJWT(req.cookies.token);

    const productId = +req.params.id;
    const { rating, comment } = req.body;

    const purchased = await prisma.order.findFirst({
      where: {
        userId,
        status: "delivered",
        items: {
          some: {
            productId,
          },
        },
      },
    });
    if (!purchased) {
      return res.status(403).json({
        error: "You must purchase this product first",
      });
    }
    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        productId,
      },
    });
    if (existingReview) {
      return res.status(400).json({
        error: "You already reviewed this product",
      });
    }
    const review = await prisma.review.create({
      data: {
        userId,
        productId,
        rating: +rating,
        comment,
      },
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = +req.params.id;
    const { id: userId, role } = verifyJWT(req.cookies.token);
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
    if (!review) {
      return res.status(404).json({
        error: "Review not found",
      });
    }
    if (review.userId !== userId && role !== "admin") {
      return res.status(403).json({
        error: "Forbidden",
      });
    }
    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

export { getAllReviews, createReview, deleteReview };
