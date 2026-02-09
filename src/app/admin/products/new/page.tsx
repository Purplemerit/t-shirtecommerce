"use client";

import { useS3Upload } from '@/hooks/useS3Upload';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';

export default function NewProductPage() {
    const router = useRouter();
    const { uploadFile, isUploading } = useS3Upload();
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        mrp: '',
        category: '',
        tagsString: '',
        images: [] as string[],
        colorsString: '',
        sizesString: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const url = await uploadFile(file);
            if (url) {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, url]
                }));
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Image upload failed');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            mrp: parseFloat(formData.mrp),
            category: formData.category,
            tags: formData.tagsString.split(',').map(s => s.trim()).filter(Boolean),
            images: formData.images,
            colors: formData.colorsString.split(',').map(s => s.trim()).filter(Boolean),
            sizes: formData.sizesString.split(',').map(s => s.trim()).filter(Boolean),
            rating: 0,
            reviews: 0
        };

        try {
            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to create product');

            router.push('/admin/products');
        } catch (error) {
            console.error(error);
            alert('Failed to create product');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>Add Product</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Title</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            placeholder="Short sleeve t-shirt"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                        />
                    </div>
                </div>

                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ fontSize: 16, marginBottom: 16 }}>Media</h3>
                    <div style={{ border: '2px dashed #ccc', padding: 40, borderRadius: 8, textAlign: 'center' }}>
                        {isUploading ? (
                            <p>Uploading...</p>
                        ) : (
                            <>
                                <input type="file" onChange={handleImageUpload} accept="image/*" />
                                <p style={{ fontSize: 13, color: '#666', marginTop: 8 }}>Accepts images, videos, or 3D models</p>
                            </>
                        )}
                    </div>
                    {formData.images.length > 0 && (
                        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                            {formData.images.map((img, i) => (
                                <img key={i} src={img} alt="Product" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }} />
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ fontSize: 16, marginBottom: 16 }}>Pricing</h3>
                    <div style={{ display: 'flex', gap: 20 }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Price</label>
                            <input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                                placeholder="0.00"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Compare-at price</label>
                            <input
                                name="mrp"
                                type="number"
                                value={formData.mrp}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>

                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ fontSize: 16, marginBottom: 16 }}>Organization</h3>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                        >
                            <option value="">Select category</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Tags (comma users)</label>
                        <input
                            name="tagsString"
                            value={formData.tagsString}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            placeholder="Vintage, Cotton, Summer"
                        />
                    </div>
                </div>

                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ fontSize: 16, marginBottom: 16 }}>Variants</h3>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Colors (comma separated)</label>
                        <input
                            name="colorsString"
                            value={formData.colorsString}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            placeholder="Red, Blue, Green"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Sizes (comma separated)</label>
                        <input
                            name="sizesString"
                            value={formData.sizesString}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            placeholder="S, M, L, XL"
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                    <button type="button" onClick={() => router.back()} className={styles.actionBtn} style={{ padding: '10px 20px' }}>Discard</button>
                    <button type="submit" disabled={submitting} className={styles.primaryButton} style={{ padding: '10px 20px' }}>
                        {submitting ? 'Saving...' : 'Save product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
