import AWS from "aws-sdk";
import { getImageId } from "./imageId.service";

const apiKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_REGION;
AWS.config.update({
  accessKeyId: apiKey,
  secretAccessKey: secretKey,
  region: region,
});

const s3 = new AWS.S3();

export const getRandomImage = async (
  bucketName: string,
  imageIdFromUser: string,
  gender?: string
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const params: AWS.S3.ListObjectsRequest = { Bucket: bucketName };

    s3.listObjects(params, (error, imageObjects) => {
      if (error) {
        console.error("Error listing objects:", error);
        return;
      }
      const images = imageObjects.Contents;

      console.log(images, "all images");

      if (images) {
        console.log(imageIdFromUser, "imageIdFromUser");

        const randomIndex = getImageId(imageIdFromUser, images.length);
        console.log(randomIndex, "randomIndex");

        const randomObject = images[randomIndex];
        console.log(randomObject, "randomObject");

        resolve(getImageByKey(bucketName, randomObject.Key as string));
      }
    });
  });
};

const getImageByKey = async (
  bucketName: string,
  objectKey: string
): Promise<Buffer> => {
  const params: AWS.S3.GetObjectRequest = {
    Bucket: bucketName,
    Key: objectKey,
  };

  const { Body } = await s3
    .getObject({ Bucket: bucketName, Key: objectKey })
    .promise();

  return Body as Buffer;
  // return new Promise((resolve, reject) => {

  //   s3.getSignedUrl("getObject", params, (err, signedUrl) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve(signedUrl);
  //     }
  //   });
  // });
};
