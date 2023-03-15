import Joi from '@hapi/joi';
import { schemas } from '../../helpers';

const { paginateValidationSchema, ObjectId } = schemas;


export const customPaginateValidateSchema = paginateValidationSchema.keys();

export const createValidationSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  content: Joi.string().required(),
  categories: Joi.array().items(Joi.object({
    name: Joi.string().optional(),
    slug: Joi.string().optional(),
  })).optional()
});

export const updateValidationSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  content: Joi.string().required(),
  categories: Joi.array().items(Joi.object({
    name: Joi.string().optional(),
    slug: Joi.string().optional(),
  })).optional()
}).unknown(true);