import sharp from "sharp";

export const resizeImage = async (
  dimension: string,
  image: Buffer
): Promise<Buffer> => {
  const splitDimension = dimension.split("x");

  const height = Number(splitDimension[0]);
  const width = Number(splitDimension[1]);

  try {
    const processedImageBuffer = await sharp(image)
      .resize(height, width)
      .toBuffer();

    return processedImageBuffer;
  } catch (error) {
    console.error("Error while resizing image:", error);
    throw error;
  }
};
