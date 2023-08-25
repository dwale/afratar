import { Joi, celebrate } from "celebrate";

const validSizes = ["200x200", "100x100", "300x300"];
// export const getRandomImageSchema = Joi.object({
//   size: Joi.string().valid(...validSizes).required(),
//   set: Joi.any().allow("a").required(),
// });
const sizeSchema = Joi.string().allow(validSizes.join(",")).required();

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
