import { Joi, celebrate } from "celebrate";
import { ALLOWED_IMAGE_FORMATS, VALID_IMAGE_SIZES } from "../constants ";

const sizeSchema = Joi.string().allow(...VALID_IMAGE_SIZES);
const formatSchema = Joi.string().valid(...ALLOWED_IMAGE_FORMATS);
const genderSchema = Joi.string().allow("male", "female");

export const validateGetRandomImageQuery: any = (
  req: any,
  res: any,
  next: any
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
