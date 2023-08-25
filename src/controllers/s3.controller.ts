import { Request, RequestHandler, Response } from "express";
import { getRandomImage } from "../services";

const bucketName = process.env.AWS_BUCKET_NAME ?? "";

export const getImage: any = async (_req: Request, res: Response) => {
  try {
    const signedUrl = await getRandomImage(bucketName);
    res.redirect(signedUrl);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).send("Error retrieving image");
  }
};
