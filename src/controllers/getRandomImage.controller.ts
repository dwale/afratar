import { Request, Response } from "express";
import { getRandomImage, reformatImage, resizeImage } from "../services";
import { ImageFormat } from "../types";
import { DEFAULT_FORMAT } from "../constants ";

const bucketName = process.env.AWS_BUCKET_NAME ?? "";

export const getImage: any = async (req: Request, res: Response) => {
  try {
    let imageBuffer = await getRandomImage(bucketName);
    const { size, format, gender } = req.query;

    if (size) {
      imageBuffer = await resizeImage(size as string, imageBuffer);
    }

    if (format && format !== DEFAULT_FORMAT) {
      imageBuffer = await reformatImage(format as ImageFormat, imageBuffer);
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageBuffer);
  } catch (error) {
    throw error;
  }
};
