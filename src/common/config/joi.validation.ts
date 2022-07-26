import * as Joi from 'joi';

export const JoiValidationShape = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3002),
  DEFAUL_LIMIT: Joi.number().default(6),
});
