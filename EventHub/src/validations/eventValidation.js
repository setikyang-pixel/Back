import Joi from "joi";

export const createEventSchema = Joi.object({
  title: Joi.string().min(3).max(140).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string().min(2).required(),
  location: Joi.string().min(2).required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().greater(Joi.ref("startTime")).required(),
  capacity: Joi.number().integer().positive().required(),
  agenda: Joi.array()
    .items(
      Joi.object({
        time: Joi.string().required(),
        title: Joi.string().required(),
      }),
    )
    .optional(),
});

export const updateEventSchema = Joi.object({
  title: Joi.string().min(3).max(140),
  description: Joi.string().min(10),
  category: Joi.string().min(2),
  location: Joi.string().min(2),
  startTime: Joi.date(),
  endTime: Joi.date().greater(Joi.ref("startTime")),
  capacity: Joi.number().integer().positive(),
  agenda: Joi.array().items(
    Joi.object({
      time: Joi.string().required(),
      title: Joi.string().required(),
    }),
  ),
}).min(1); 
