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

export const getRandomImage = async (bucketName: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    s3.listObjects({ Bucket: bucketName }, (error, imageObjects) => {
      if (error) {
        console.error("Error listing objects:", error);
        return;
      }
      const images = imageObjects.Contents;

      if (images) {
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomObject = images[randomIndex];

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
