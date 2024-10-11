import { ulid } from "ulid";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import s3Client from "./s3/client";

export const validImagesTypes = ["image/png", "image/jpeg", "image/jpg"];
const maxFileSize = 2097152; // 2MB

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
