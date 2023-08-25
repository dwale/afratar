import { Request, Response } from "express";
import { getRandomImage } from "../services";

const bucketName = process.env.AWS_BUCKET_NAME ?? "";

export const getImage = async (req: Request, res: Response) => {
  console.log("here");

  console.log(bucketName, "bucketName");

  try {
    const signedUrl = await getRandomImage(bucketName);

    // Redirect the client to the signed URL
    // return res.send([signedUrl]);
    res.redirect(signedUrl);

    console.log(bucketName);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).send("Error retrieving image");
  }
};
