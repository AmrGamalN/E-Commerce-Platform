import { S3Client } from "@aws-sdk/client-s3";
const s3 = new S3Client({
  region: process.env.REACT_APP_AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string,
  },
});
const bucketName = process.env.REACT_APP_S3_BUCKET_NAME as string;

export { s3, bucketName };
