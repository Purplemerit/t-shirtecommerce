"use client";
import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useS3Upload } from '@/hooks/useS3Upload';

export default function CreateCollectionPage() {
    const router = useRouter();
    const { uploadFile, isUploading } = useS3Upload();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = await uploadFile(file);
            if (url) setImageUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/admin/collections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    image: imageUrl,
                    type: 'manual', // simplification
                    products: []
                })
            });

            if (res.ok) {
                router.push('/admin/products/collections');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: 50 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 12 }}>
                    <ArrowLeft size={20} color="#5c5f62" />
                </button>
                <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Create collection</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Title</label>
                            <input
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Summer Collection, Under $100, etc."
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Collection image</h3>
                        {imageUrl ? (
                            <div style={{ marginBottom: 12 }}>
                                <img src={imageUrl} alt="Collection" style={{ width: '100%', borderRadius: 4 }} />
                                <button type="button" onClick={() => setImageUrl('')} style={{ color: 'red', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', marginTop: 8 }}>Remove</button>
                            </div>
                        ) : (
                            <div style={{ border: '1px dashed #ccc', borderRadius: 4, padding: 40, textAlign: 'center' }}>
                                <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} id="coll-img" />
                                <label htmlFor="coll-img" style={{ cursor: 'pointer', color: '#0078d4' }}>
                                    {isUploading ? 'Uploading...' : 'Add image'}
                                </label>
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={submitting} className={styles.primaryButton} style={{ width: '100%' }}>
                        {submitting ? <Loader2 className="animate-spin" size={16} /> : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
}
