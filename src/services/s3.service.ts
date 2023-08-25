import AWS from "aws-sdk";

const apiKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_REGION;
AWS.config.update({
  accessKeyId: apiKey,
  secretAccessKey: secretKey,
  region: region,
});

const s3 = new AWS.S3();

export function getImageFromS3(
  bucketName: string,
  objectKey: string
): Promise<string> {
  const params: AWS.S3.GetObjectRequest = {
    Bucket: bucketName,
    Key: objectKey,
  };

  console.log(apiKey, secretKey, bucketName, objectKey, region);

  return new Promise((resolve, reject) => {
    s3.getSignedUrl("getObject", params, (err, signedUrl) => {
      if (err) {
        console.error("Error generating signed URL for image:", err);
        reject(err);
      } else {
        resolve(signedUrl);
      }
    });
  });
}
