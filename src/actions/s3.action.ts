"use server";

import * as AwsConnect from "@/lib/s3";

export const uploadFileToAws = async (file: File, address: string) => {
  try {
    // upload file to AWS S3
    const key = `${address}/${file.name}`;
    await AwsConnect.UploadFileToAws(file, key);

    // get url of the uploaded file
    return AwsConnect.getObjectUrl(key);
  } catch (error) {
    console.error("Error uploading file to AWS S3:", error);
    throw error;
  }
};
