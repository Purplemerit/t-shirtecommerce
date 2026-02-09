"use client";
import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { useS3Upload } from '@/hooks/useS3Upload';
import { FileText, Loader2, Upload } from 'lucide-react';

export default function FilesPage() {
    const { uploadFile, isUploading } = useS3Upload();
    const [files, setFiles] = useState<string[]>([]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList) return;

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const url = await uploadFile(file);
            if (url) {
                setFiles(prev => [...prev, url]);
            }
        }
    };

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Files</h1>
                <label className={styles.primaryButton} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                    Upload files
                    <input type="file" multiple style={{ display: 'none' }} onChange={handleFileUpload} />
                </label>
            </div>

            <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e1e3e5', minHeight: 400 }}>
                {files.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400 }}>
                        <div style={{ width: 80, height: 80, background: '#f4f4f4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <FileText size={32} color="#5c5f62" />
                        </div>
                        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Upload and manage files</h2>
                        <p style={{ color: '#666', maxWidth: 400, textAlign: 'center' }}>
                            Upload images, videos, and documents to use across your store.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16, padding: 20 }}>
                        {files.map((url, i) => (
                            <div key={i} style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden' }}>
                                <div style={{ height: 120, background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={url} alt="File" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                                <div style={{ padding: 8, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {url.split('/').pop()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
