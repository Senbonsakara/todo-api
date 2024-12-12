import Joi from "joi";

export const userProfileSchema = Joi.object({
  profilePicture: Joi.string(),
  location: Joi.string(),
  sex: Joi.string(),
  dateOfBirth: Joi.date(),
  contact: Joi.string(),
});
