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
/**
 * The function `getRandomImage` retrieves a random image from an AWS S3 bucket based on the provided
 * bucket name, image ID, and optional gender.
 * @param {string} bucketName - The `bucketName` parameter is a string that represents the name of the
 * S3 bucket where the images are stored.
 * @param {string} imageIdFromUser - The `imageIdFromUser` parameter is a string that represents the ID
 * of the image provided by the user.
 * @param {string} [gender] - The `gender` parameter is an optional parameter that specifies the gender
 * of the image to retrieve. It can be either "male" or "female". If the `gender` parameter is not
 * provided, the function will retrieve a random image regardless of gender.
 * @returns a Promise that resolves to a Buffer.
 */

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

          resolve(getImageByKey(bucketName, randomObject.Key as string));
        }
      });
    } catch (error) {
      throw error;
    }
  });
};

/**
 * The function `getImageByKey` retrieves an image from an AWS S3 bucket using the provided bucket name
 * and object key.
 * @param {string} bucketName - The `bucketName` parameter is a string that represents the name of the
 * S3 bucket where the image is stored.
 * @param {string} objectKey - The `objectKey` parameter is a string that represents the key or name of
 * the object you want to retrieve from the S3 bucket. It is used to uniquely identify the object
 * within the bucket.
 * @returns The function `getImageByKey` returns a `Promise` that resolves to a `Buffer` object.
 */
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
