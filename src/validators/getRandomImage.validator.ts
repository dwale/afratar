import { Joi, celebrate } from "celebrate";
import { ALLOWED_IMAGE_FORMATS, VALID_IMAGE_SIZES } from "../constants ";
import { NextFunction, Request, Response } from "express";

const sizeSchema = Joi.string().allow(...VALID_IMAGE_SIZES);
const formatSchema = Joi.string().valid(...ALLOWED_IMAGE_FORMATS);
const genderSchema = Joi.string().allow("male", "female");

export const validateGetRandomImageQuery: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = celebrate({
    query: {
      size: sizeSchema,
      format: formatSchema,
      gender: genderSchema,
    },
  });

  schema(req, res, next);
};
