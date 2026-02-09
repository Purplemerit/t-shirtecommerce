"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useS3Upload } from '@/hooks/useS3Upload';
import styles from '@/app/admin/admin.module.css';
import { ChevronLeft, Loader2, Save, Trash2, Image as ImageIcon } from 'lucide-react';

export default function EditProductPage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const { uploadFile, isUploading } = useS3Upload();
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/admin/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        name: data.name,
                        description: data.description || '',
                        price: data.price.toString(),
                        mrp: data.mrp ? data.mrp.toString() : '',
                        category: data.category || '',
                        tagsString: data.tags?.join(', ') || '',
                        images: data.images || [],
                        colorsString: data.colors?.join(', ') || '',
                        sizesString: data.sizes?.join(', ') || ''
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const url = await uploadFile(file);
            if (url) {
                setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Image upload failed');
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            mrp: formData.mrp,
            category: formData.category,
            tags: formData.tagsString.split(',').map(s => s.trim()).filter(Boolean),
            images: formData.images,
            colors: formData.colorsString.split(',').map(s => s.trim()).filter(Boolean),
            sizes: formData.sizesString.split(',').map(s => s.trim()).filter(Boolean)
        };

        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to update product');
            router.push('/admin/products');
        } catch (error) {
            console.error(error);
            alert('Update failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <Loader2 className="animate-spin" size={32} color="#008060" />
        </div>
    );

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className={styles.pageHeader} style={{ marginBottom: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <button onClick={() => router.back()} className={styles.actionBtn} style={{ padding: 8 }}>
                        <ChevronLeft size={20} />
                    </button>
                    <h1 className={styles.pageTitle} style={{ fontSize: 24, fontWeight: 800 }}>{formData.name || 'Edit Product'}</h1>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => router.push('/admin/products')} className={styles.actionBtn} style={{ padding: '10px 20px' }}>Discard</button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className={styles.primaryButton}
                        style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, background: '#008060', border: 'none', color: '#fff', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}
                    >
                        <Save size={18} /> {submitting ? 'Saving...' : 'Save product'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 24 }}>
                {/* Left Column */}
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className={styles.contentCard}>
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Product Title</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={styles.searchInput}
                                style={{ width: '100%', background: '#fff', border: '1px solid #e1e3e5', padding: '12px', borderRadius: 8 }}
                                placeholder="e.g. Yellow Bagh Saree"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={6}
                                style={{ width: '100%', border: '1px solid #e1e3e5', padding: '12px', borderRadius: 8, outline: 'none', fontSize: 14, fontFamily: 'inherit' }}
                                placeholder="Describe your product..."
                            />
                        </div>
                    </div>

                    <div className={styles.contentCard}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Media</h3>
                        <div style={{ border: '2px dashed #e1e3e5', borderRadius: 12, padding: 40, textAlign: 'center', background: '#f9fafb' }}>
                            <input type="file" id="image-upload" hidden onChange={handleImageUpload} />
                            <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                                <ImageIcon size={32} style={{ color: '#8c9196', marginBottom: 12 }} />
                                <p style={{ fontWeight: 600, color: '#1a1c1d', margin: 0 }}>{isUploading ? 'Uploading...' : 'Click to upload image'}</p>
                                <p style={{ fontSize: 12, color: '#8c9196', marginTop: 4 }}>Supports JPG, PNG, WEBP</p>
                            </label>
                        </div>
                        {formData.images.length > 0 && (
                            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
                                {formData.images.map((img, i) => (
                                    <div key={i} style={{ position: 'relative', width: 120, height: 120, borderRadius: 8, overflow: 'hidden', border: '1px solid #e1e3e5' }}>
                                        <img src={img} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            onClick={() => removeImage(i)}
                                            style={{ position: 'absolute', top: 5, right: 5, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.contentCard}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Pricing</h3>
                        <div style={{ display: 'flex', gap: 20 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Selling Price (₹)</label>
                                <input
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    style={{ width: '100%', border: '1px solid #e1e3e5', padding: '12px', borderRadius: 8, outline: 'none' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14 }}>MRP (₹)</label>
                                <input
                                    name="mrp"
                                    type="number"
                                    value={formData.mrp}
                                    onChange={handleChange}
                                    style={{ width: '100%', border: '1px solid #e1e3e5', padding: '12px', borderRadius: 8, outline: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className={styles.contentCard}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Organization</h3>
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                style={{ width: '100%', border: '1px solid #e1e3e5', padding: '12px', borderRadius: 8, background: '#fff' }}
                            >
                                <option value="Saree">Saree</option>
                                <option value="T-Shirts">T-Shirts</option>
                                <option value="Shirts">Shirts</option>
                                <option value="Shoes">Shoes</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Tags (comma users)</label>
                            <input
                                name="tagsString"
                                value={formData.tagsString}
                                onChange={handleChange}
                                style={{ width: '100%', border: '1px solid #e1e3e5', padding: '12px', borderRadius: 8 }}
                                placeholder="New, Sale, Cotton"
                            />
                        </div>
                    </div>

                    <div className={styles.contentCard}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Variants</h3>
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Colors (Hex, comma separated)</label>
                            <input
                                name="colorsString"
                                value={formData.colorsString}
                                onChange={handleChange}
                                style={{ width: '100%', border: '1px solid #e1e3e5', padding: '12px', borderRadius: 8 }}
                                placeholder="#000000, #ffffff"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 14 }}>Sizes (Comma separated)</label>
                            <input
                                name="sizesString"
                                value={formData.sizesString}
                                onChange={handleChange}
                                style={{ width: '100%', border: '1px solid #e1e3e5', padding: '12px', borderRadius: 8 }}
                                placeholder="S, M, L, XL"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
