import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
  HeadObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  PutObjectRequest,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET_NAME = process.env.AWS_S3_BUCKET!;
const ENDPOINT = process.env.AWS_S3_ENDPOINT!;
const ENVIRONMENT = process.env.DEVELOPMENT_ENVIRONMENT;

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: process.env.NODE_ENV === "development", // Required for MinIO; not needed for AWS S3
});

export const getObjectUrl = async (key: string) => {
  // if we are using aws outside of docker we should use http://localhost:9000
  const domain = ENVIRONMENT === "docker" ? "localhost:9000" : ENDPOINT;

  return `${domain}/${BUCKET_NAME}/${key}`;
};

export const awsFolderNames = {
  blogs: {
    // TODO add (id) of blogs to addresses
    thumbnails: "blogs/thumbnails",
    content: "blogs/content",
  },
};

export const UploadFileToAws = async (file: File, filePath: string) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const mimetype = file.type; // Extract mimetype from the file object

    if (!mimetype) {
      throw new Error("MIME type is missing from the file.");
    }

    // configures the parameters for the upload
    const uploadParams: PutObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: filePath,
      Body: fileBuffer as never,
      ContentType: mimetype,
      ACL: ObjectCannedACL.public_read,
    };

    // if folder name is provided, upload the file to the specified folder

    await s3Client.send(new PutObjectCommand(uploadParams));

    // uploads the file to the bucket
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const isFileAvailableInAwsBucket = async (
  fileName: string
): Promise<boolean> => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  try {
    await s3Client.send(new HeadObjectCommand(params));
    return true;
  } catch (error) {
    if ((error as Error).name === "NotFound") {
      return false;
    }
    throw error;
  }
};

export const getFileUrlFromAws = async (key: string, expire?: number) => {
  try {
    // check if the file exists in the bucket
    const check = await isFileAvailableInAwsBucket(key);

    if (!check) {
      throw new Error("File not found in the bucket.");
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!, // Specify the AWS S3 bucket name
      Key: key, // Specify the file name
    });

    if (expire) {
      // If the expiration time is provided
      return await getSignedUrl(s3Client, command, { expiresIn: expire });
    }

    // return the signed URL with default expiration time 15 minutes
    return await getSignedUrl(s3Client, command);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteFileFromAws = async (key: string) => {
  try {
    // Configure the parameters for the S3 upload
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    };

    // Upload the file to S3
    await s3Client.send(new DeleteObjectCommand(uploadParams));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
