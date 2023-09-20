export const DEFAULT_FORMAT = "svg";

export const ALLOWED_IMAGE_FORMATS = ["jpg", "webp", "svg", "png"];

export const VALID_IMAGE_SIZES = ["200x200", "100x100", "300x300"];

export const BUCKET = {
  MALE: process.env.AWS_BUCKET_NAME_MALE ?? '',
  FEMALE: process.env.AWS_BUCKET_NAME_FEMALE ?? '',
};
