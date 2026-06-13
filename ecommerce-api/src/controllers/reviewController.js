export const getAllReviews = (req, res) => {
  res.json({ message: "getAllReviews" });
};

export const getReviewById = (req, res) => {
  res.json({ message: "getReviewById", id: req.params.id });
};

export const createReview = (req, res) => {
  res.status(201).json({ message: "createReview", data: req.body });
};

export const updateReview = (req, res) => {
  res.json({ message: "updateReview", id: req.params.id, data: req.body });
};

export const deleteReview = (req, res) => {
  res.status(204).send();
};
