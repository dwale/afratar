import { Request, Response } from "express";
import { getImageFromS3 } from "../services";

const bucketName = process.env.AWS_BUCKET_NAME ?? "";

export const getImage = async (req: Request, res: Response) => {
  console.log("here");
  const { imageName } = req.params;
  const objectKey = `${imageName}`;

  console.log(bucketName, "bucketName");

  try {
    const signedUrl = await getImageFromS3(bucketName, objectKey);

    // Redirect the client to the signed URL
    // return res.send([signedUrl]);
    res.redirect(signedUrl);

    console.log(bucketName);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).send("Error retrieving image");
  }
};
