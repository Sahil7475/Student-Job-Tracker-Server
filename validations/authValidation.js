import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
      "Password must be at least 6 characters long and include an uppercase letter, a number, and a special character",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
});
