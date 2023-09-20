import { Request, Response } from "express";
import { getRandomImage, reformatImage, resizeImage } from "../services";
import { ImageFormat } from "../types";
import { BUCKET, DEFAULT_FORMAT } from "../constants ";

import axios from "axios";

export const getImage: any = async (req: Request, res: Response) => {
  console.log(req.ip, "request");
  try {
    const referringDomain =
      req.get("referer") || req.get("origin") || "Unknown";

    const userIpAddress = req.socket.remoteAddress;

    const ipinfoResponse = await axios.get(
      `https://ipinfo.io/${userIpAddress}/json`
    );
    const country = ipinfoResponse.data.country;

    console.log(`Referring Domain: ${referringDomain} ${req.ip}`);
    console.log(`User's Country: ${country}`);
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
