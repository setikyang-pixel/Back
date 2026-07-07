import { Router } from "express";
import {
  createEventController,
  getEventsController,
  getEventByIdController,
  deleteEventController,
  updateEventController,
  joinEventController,
  leaveEventController,
} from "../controllers/eventController.js";
import { validate } from "../middleware/validate.js";
import {
  createEventSchema,
  updateEventSchema
} from "../validations/eventValidation.js";
import { authentication,authorize } from "../middleware/auth.js";

const event = Router();

event.get("/", getEventsController);
event.get("/:id", getEventByIdController);
event.post("/", authentication,authorize("organizer"),validate(createEventSchema), createEventController);
event.patch("/:id",authentication, authorize("organizer"),validate(updateEventSchema), updateEventController);
event.delete("/:id",authentication,authorize("organizer"),  deleteEventController);
event.post("/:id/join", authentication,authorize("member"), joinEventController);
event.delete("/:id/join",authentication,authorize("member"), leaveEventController);

export default event;