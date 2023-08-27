import { Joi, celebrate } from "celebrate";

const validSizes = ["200x200", "100x100", "300x300"];
//TODO: account for multiple params
// export const getRandomImageSchema = Joi.object({
//   size: Joi.string().valid(...validSizes).required(),
//   set: Joi.any().allow("a").required(),
// });
//fix validation
const sizeSchema = Joi.string().allow(validSizes.join(","));

export const validateGetRandomImageQuery: any = (
  req: any,
  res: any,
  next: any
) => {
  console.log(req.url);
  console.log(validSizes);
  const schema = celebrate({
    query: {
      size: sizeSchema,
    },
  });

  schema(req, res, next);
};
