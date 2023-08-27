import { Request, Response } from "express";
import { getRandomImage, resizeImage } from "../services";

const bucketName = process.env.AWS_BUCKET_NAME ?? "";

export const getImage: any = async (req: Request, res: Response) => {
  try {
    let imageBuffer = await getRandomImage(bucketName);
    const { size, format, gender } = req.query;

    if (size) {
      imageBuffer = await resizeImage(size as string, imageBuffer);
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).send("Error retrieving image");
  }
};
