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
    try {
      const params: AWS.S3.ListObjectsRequest = { Bucket: bucketName };

      s3.listObjects(params, (error, imageObjects) => {
        if (error) {
          const params: AWS.S3.ListObjectsRequest = { Bucket: bucketName };

          s3.listObjects(params, (error, imageObjects) => {
            if (error) {
              throw error;
            }
            const images = imageObjects.Contents;

            if (images) {
              const randomIndex = getImageId(imageIdFromUser, images.length);

              const randomObject = images[randomIndex];

              resolve(getImageByKey(bucketName, randomObject.Key as string));
            }
          });
        }
        const images = imageObjects.Contents;

        if (images) {
          const randomIndex = getImageId(imageIdFromUser, images.length);

          const randomObject = images[randomIndex];

          console.log(randomObject, randomIndex);

          resolve(getImageByKey(bucketName, randomObject.Key as string));
        }
      });
    } catch (error) {
      throw error;
    }
  });
};

const getImageByKey = async (
  bucketName: string,
  objectKey: string
): Promise<Buffer> => {
  try {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: bucketName,
      Key: objectKey,
    };

    const { Body } = await s3
      .getObject({ Bucket: bucketName, Key: objectKey })
      .promise();

    return Body as Buffer;
  } catch (error) {
    throw error;
  }
};
