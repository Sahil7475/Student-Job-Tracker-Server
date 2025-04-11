import Joi from "joi";

export const jobSchema = Joi.object({
  company: Joi.string().required().messages({
    "string.empty": "Company name is required",
    "any.required": "Company name is required",
  }),
  role: Joi.string().required().messages({
    "string.empty": "Job role is required",
    "any.required": "Job role is required",
  }),
  status: Joi.string()
    .valid("Applied", "Interview", "Offer", "Rejected")
    .default("Applied")
    .messages({
      "any.only": "Status must be one of Applied, Interview, Offer, or Rejected",
    }),
  applicationDate: Joi.date().required().messages({
    "date.base": "Application date must be a valid date",
    "any.required": "Application date is required",
  }),
  link: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Link must be a valid URL",
  }),
});
