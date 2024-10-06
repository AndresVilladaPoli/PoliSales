import { ulid } from "ulid";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";

export const validImagesTypes = ["image/png", "image/jpeg", "image/jpg"];
const maxFileSize = 2097152; // 2MB

// Esto solo funciona en la nube
const s3Client = new S3Client({});

export const createPresignedUrl = async (mimeType) => {
  if (!validImagesTypes.includes(mimeType)) {
    throw new Error("Invalid file type, this image type is not allowed");
  }

  const key = ulid();

  return await createPresignedPost(s3Client, {
    Bucket: process.env.FILES_BUCKET,
    Expires: 300, // 5 min to send the file
    Key: key,
    Fields: {
      acl: "public-read",
      "Content-Type": mimeType,
    },
    Conditions: [
      ["eq", "$Content-Type", mimeType],
      ["content-length-range", 0, maxFileSize],
      { acl: "public-read" },
      { bucket: process.env.FILES_BUCKET },
    ],
  });
};
