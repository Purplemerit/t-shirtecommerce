import { useState } from 'react';

export const useS3Upload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = async (file: File): Promise<string | null> => {
        setIsUploading(true);
        setError(null);

        try {
            // 1. Get presigned URL
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName: file.name, fileType: file.type }),
            });

            const { uploadUrl, fileUrl, error: apiError } = await res.json();
            if (apiError) throw new Error(apiError);

            // 2. Upload to S3
            const uploadRes = await fetch(uploadUrl, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': file.type },
            });

            if (!uploadRes.ok) throw new Error('Failed to upload to S3');

            return fileUrl;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return { uploadFile, isUploading, error };
};
