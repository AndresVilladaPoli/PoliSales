import { S3Client } from "@aws-sdk/client-s3";

const isDev = process.env.NODE_ENV === "development";

const createClient = () => {
  if (isDev) {
    return new S3Client({
      endpoint: "http://localhost:4566",
      accessKeyId: "test",
      secretAccessKey: "test",
      s3ForcePathStyle: true,
    });
  }

  return new S3Client({});
};

const client = createClient();

export default client;