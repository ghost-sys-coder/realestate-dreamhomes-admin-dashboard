import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import "dotenv";
import crypto from "crypto";


export const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

export const uploadToS3 = async (file: File) => {
    const fileExtension = file.name.split(".").pop();
    const fileKey = `admin/properties/${crypto.randomBytes(16).toString("hex")}.${fileExtension}`;
    const arrayBuffer = await file.arrayBuffer();
    const body = new Uint8Array(arrayBuffer);

    await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileKey!,
        Body: body,
        ContentType: file.type,
        // ACL: "public-read"
    }));

    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
}