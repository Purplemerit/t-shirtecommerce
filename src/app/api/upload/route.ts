import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client, BUCKET_NAME } from "@/lib/s3";

export async function POST(req: Request) {
    try {
        const { fileName, fileType } = await req.json();

        if (!BUCKET_NAME) {
            return NextResponse.json({ error: "S3 Bucket Name not configured" }, { status: 500 });
        }

        const key = `uploads/${Date.now()}-${fileName}`;
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: fileType,
        });

        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        const fileUrl = `https://${BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${key}`;

        return NextResponse.json({ uploadUrl, fileUrl });
    } catch (error) {
        console.error("S3 Presigned URL error:", error);
        return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
    }
}
