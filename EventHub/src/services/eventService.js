import Event from "../models/Event.js";
import AppError from "../utils/appError.js";

export const createEvents = async (organizerId, data) => {
  const newEvent = await Event.create({ ...data, organizer: organizerId });
  return { event: newEvent };
};

export const getEvents = async (
  { category, from, to },
  { page = 1, limit = 10 },
) => {
  let dataQuery = {};
  if (category) dataQuery.category = category;
  if (from || to) {
    dataQuery.startTime = {};
    if (from) dataQuery.startTime.$gte = from;
    if (to) dataQuery.startTime.$lte = to;
  }
  const newEvent = await Event.find(dataQuery)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("organizer", "name email");
  return { event: newEvent };
};

export const getEventsByID = async (eventId) => {
  const event = await Event.findById(eventId).populate("organizer");
  if (!event) throw new AppError("This id is not defined!!!", 404);
  return { event };
};

export const updateEvent = async (eventId, organizerId, data) => {
  const event = await Event.findById(eventId);
  if (!event) throw new AppError("Event not found!!!", 404);
  if (event.organizer.toString() !== organizerId)
    throw new AppError("Organizers are not equal!!!", 403);
  const updateEvent = await Event.findByIdAndUpdate(
    eventId,
    {
      ...data,
      organizer: organizerId,
    },
    { new: true },
  );
  return { event: updateEvent };
};

export const deleteEvent = async (eventId, organizerId) => {
  const event = await Event.findById(eventId);
  if (!event) throw new AppError("Event not found!!!", 404);
  if (event.organizer.toString() !== organizerId)
    throw new AppError("Organizers are not equal!!!", 403);
  const deleteEvent = await Event.findByIdAndDelete(eventId);
  return { event: "Event successfully deleted." };
};

// At first I thought of doing a regular search then checking the condition and adding a new argument but I realized what would happen if my users logged in at the same time so I came up with this idea.
export const joinEvent = async (eventId, userId) => {
  const addUser = await Event.findOneAndUpdate(
    {
      _id: eventId,
      "attendees.user": { $ne: userId },
      $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] },
    },
    {
      $push: {
        attendees: {
          user: userId,
          joinedAt: new Date(),
        },
      },
    },
    {
      new: true,
    },
  );

  if (addUser) return { event: addUser };

  const findUser = await Event.findById(eventId);
  if (!findUser) throw new AppError("Event not found!!!", 404);
  if (findUser.attendees.length >= findUser.capacity)
    throw new AppError("Event clear size exceeded!!!", 400);
  const eventDouble = findUser.attendees.some(
    (item) => item.user.toString() === userId,
  );
  if (eventDouble)
    throw new AppError("This user is already register in this event!!!", 400);
  throw new AppError("Event join problem!!!", 400);
};

export const leaveEvent = async (eventId, userId) => {
  const leaveUserData = await Event.findByIdAndUpdate(
    eventId,
    {
      $pull: {
        attendees: {
          user: userId,
        },
      },
    },
    {
      new: true,
    },
  );
  if (!leaveUserData) throw new AppError("Event not found!!!", 404);
  return { event: leaveUserData };
};
