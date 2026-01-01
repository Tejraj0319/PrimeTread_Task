import Joi from "joi";

export const createTaskValidator = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow(""),
});

export const updateTaskValidator = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string().allow(""),
  status: Joi.string().valid("PENDING", "IN_PROGRESS", "COMPLETED"),
});
