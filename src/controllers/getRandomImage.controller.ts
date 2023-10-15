import { Request, Response } from "express";
import { getRandomImage, reformatImage, resizeImage } from "../services";
import { ImageFormat } from "../types";
import { BUCKET, DEFAULT_FORMAT } from "../constants ";

export const getImage: any = async (req: Request, res: Response) => {
  try {
    const { size, format, gender } = req.query;
    const imageIdFromUser = req.params.imageId;

    const bucketName =
      BUCKET[String(gender).toUpperCase() as "MALE" | "FEMALE"];
    console.log(bucketName, "bucketName");

    let imageBuffer = await getRandomImage(
      bucketName,
      imageIdFromUser,
      gender as string
    );

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
