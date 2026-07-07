import express from "express";
import auth from "./authRoutes.js";
import event from "./eventRoutes.js";
import review from "./reviewRoutes.js";

const all = express.Router();
all.use("/auth", auth);
all.use("/event", event);
all.use("/event/:eventId/reviews", review);

export default all;
