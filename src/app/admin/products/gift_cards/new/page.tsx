"use client";
import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, Plus, Image as ImageIcon, ChevronDown } from 'lucide-react';

export default function CreateGiftCardPage() {
    const router = useRouter();
    const [denominations, setDenominations] = useState([10, 25, 50, 100]);
    const [title, setTitle] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const addDenomination = () => {
        setDenominations([...denominations, 0]);
    };

    const removeDenomination = (index: number) => {
        const newDenoms = [...denominations];
        newDenoms.splice(index, 1);
        setDenominations(newDenoms);
    };

    const updateDenomination = (index: number, value: string) => {
        const newDenoms = [...denominations];
        newDenoms[index] = parseFloat(value) || 0;
        setDenominations(newDenoms);
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const payload = {
                name: title,
                description: 'Gift Card', // Simplified
                price: denominations[0],
                mrp: denominations[0],
                category: 'Gift Cards',
                images: [],
                isGiftCard: true,
                denominations: denominations,
                tags: ['Gift Card'],
                colors: [],
                sizes: []
            };

            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.push('/admin/products');
            } else {
                alert('Failed to create gift card');
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
                <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Create gift card product</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
                {/* Main Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* Title & Description */}
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Title</label>
                            <input
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Description</label>
                            <div style={{ border: '1px solid #ccc', borderRadius: 4, minHeight: 150 }}>
                                <div style={{ borderBottom: '1px solid #eee', padding: '8px 12px', background: '#f9f9f9', display: 'flex', gap: 12, fontSize: 13, color: '#666' }}>
                                    <span>Paragraph</span> <span>B</span> <span>I</span> <span>U</span> <span>Link</span>
                                </div>
                                <div style={{ padding: 12 }} />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Media</h3>
                        <div style={{ border: '1px solid #ccc', borderRadius: 4, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button className={styles.actionBtn}>Upload new</button>
                                <button className={styles.actionBtn} style={{ background: 'transparent', border: 'none', color: '#0078d4', textDecoration: 'underline' }}>Select existing</button>
                            </div>
                            <span style={{ fontSize: 13, color: '#666' }}>Accepts images, videos, or 3D models</span>
                        </div>
                    </div>

                    {/* Category */}
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Category</h3>
                        <input
                            value="Gift Cards"
                            readOnly
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, background: '#f4f4f4' }}
                        />
                        <p style={{ fontSize: 12, color: '#666', marginTop: 6 }}>Determines tax rates and adds metafields to improve search, filters, and cross-channel sales.</p>
                    </div>

                    {/* Denominations */}
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Denominations</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {denominations.map((denom, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ position: 'relative', flex: 1 }}>
                                        <span style={{ position: 'absolute', left: 10, top: 9, color: '#666' }}>₹</span>
                                        <input
                                            type="number"
                                            value={denom}
                                            onChange={(e) => updateDenomination(i, e.target.value)}
                                            style={{ width: '100%', padding: '8px 12px 8px 24px', border: '1px solid #ccc', borderRadius: 4 }}
                                        />
                                    </div>
                                    <button onClick={() => removeDenomination(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            <button onClick={addDenomination} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0078d4', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 14, padding: 0 }}>
                                <Plus size={16} /> Add denomination
                            </button>
                        </div>
                    </div>

                    {/* SEO */}
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Search engine listing</h3>
                            <button style={{ color: '#0078d4', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                        </div>
                        <p style={{ fontSize: 13, color: '#666', marginTop: 8 }}>Add a title and description to see how this product might appear in a search engine listing</p>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Status */}
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Status</h3>
                        <select style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ccc' }}>
                            <option>Active</option>
                            <option>Draft</option>
                        </select>
                    </div>

                    {/* Publishing */}
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Publishing</h3>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <span style={{ fontSize: 13, background: '#f4f4f4', padding: '4px 8px', borderRadius: 4 }}>Online Store</span>
                            <span style={{ fontSize: 13, background: '#f4f4f4', padding: '4px 8px', borderRadius: 4 }}>Point of Sale</span>
                        </div>
                    </div>

                    {/* Organization */}
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Product organization</h3>
                        <div style={{ marginBottom: 12 }}>
                            <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>Type</label>
                            <input style={{ width: '100%', padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4 }} />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>Vendor</label>
                            <input style={{ width: '100%', padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4 }} />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>Collections</label>
                            <input placeholder="Search collections" style={{ width: '100%', padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4 }} />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>Tags</label>
                            <input placeholder="Add tags" style={{ width: '100%', padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4 }} />
                        </div>
                    </div>

                    {/* Theme template */}
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Theme template</h3>
                        <select style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ccc' }}>
                            <option>Default product</option>
                        </select>
                    </div>

                    {/* Gift card template */}
                    <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Gift card template</h3>
                        <select style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ccc' }}>
                            <option>Default gift card</option>
                        </select>
                        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>This is what customers see when they redeem a gift card.</p>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className={styles.primaryButton}
                    style={{ background: 'black', color: 'white', padding: '10px 20px', borderRadius: 4 }}
                    onClick={handleSubmit}
                    disabled={submitting}
                >
                    {submitting ? 'Saving...' : 'Save gift card product'}
                </button>
            </div>
        </div>
    );
}
