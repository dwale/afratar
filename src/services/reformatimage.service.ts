import sharp from "sharp";
import { ImageFormat } from "../types";

export const reformatImage = async (
  toFormat: ImageFormat,
  image: Buffer
): Promise<Buffer> => {
  try {
    const processedImageBuffer = await sharp(image)
      .toFormat(`${toFormat}`)
      .toBuffer();
    return processedImageBuffer;
  } catch (error) {
    throw error;
  }
};
