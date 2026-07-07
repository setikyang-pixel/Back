import asyncHandler from "../middleware/asyncHandler.js";
import {
  createEvents,
  getEvents,
  getEventsByID,
  deleteEvent,
  updateEvent,
  joinEvent,
  leaveEvent,
} from "../services/eventService.js";

export const createEventController = asyncHandler(async (req, res) => {
  const organizer = req.user.id;
  const data = req.body;
  const { event } = await createEvents(organizer, data);
  res.status(201).json({ success: true, data: event });
});

export const getEventsController = asyncHandler(async (req, res) => {
  const filter = {
    category: req.query.category,
    from: req.query.from,
    to: req.query.to,
  };
  const pagination = {
    page: req.query.page,
    limit: req.query.limit,
  };
  
  const {event }= await getEvents(filter, pagination);
  console.log(event);
  res.status(201).json({ success: true, data: event });
});

export const getEventByIdController = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const event = await getEventsByID(eventId);
  res.status(201).json({ success: true, data: event });
});

export const deleteEventController = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const organizer = req.user.id;
  const event = await deleteEvent(eventId, organizer);
  res.status(201).json({ success: true, data: event });
});

export const updateEventController = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const organizerId = req.user.id;
  const data = req.body;
  const event = await updateEvent(eventId, organizerId, data);
  res.status(201).json({ success: true, data: event });
});

export const joinEventController = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;
  const event = await joinEvent(eventId, userId);
  res.status(201).json({ success: true, data: event });
});

export const leaveEventController = asyncHandler(async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;
  const event = await leaveEvent(eventId, userId);
  res.status(201).json({ success: true, data: event });
});
