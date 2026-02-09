"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Package, Plus, Loader2, Search, Filter, ArrowUpDown, MoreHorizontal, Trash2, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EmptyProductIcon = () => (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="60" fill="#F8F9FA" />
        <rect x="50" y="45" width="40" height="50" rx="4" fill="white" stroke="#E1E3E5" strokeWidth="2" />
        <path d="M50 80L90 80" stroke="#E1E3E5" strokeWidth="2" />
        <rect x="55" y="55" width="30" height="20" rx="2" fill="#F3F4F6" />
    </svg>
);

interface Product {
    _id: string;
    id: number;
    name: string;
    price: number;
    images: string[];
    category: string;
    reviews: number;
    rating: number;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null);
    const router = useRouter();

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(products.filter(p => (p._id || p.id.toString()) !== id));
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting product');
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <Loader2 className="animate-spin" size={32} color="#008060" />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle} style={{ fontSize: 28, fontWeight: 800 }}>Products</h1>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className={styles.actionBtn} style={{ padding: '8px 16px', fontWeight: 600 }}>Export</button>
                    <button className={styles.actionBtn} style={{ padding: '8px 16px', fontWeight: 600 }}>Import</button>
                    <button
                        className={styles.primaryButton}
                        onClick={() => router.push('/admin/products/new')}
                        style={{ background: '#008060', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, color: '#fff', cursor: 'pointer' }}
                    >
                        <Plus size={18} /> Add product
                    </button>
                </div>
            </div>

            <div className={styles.contentCard} style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #e1e3e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button style={{ background: 'none', border: 'none', fontWeight: 700, color: '#008060', borderBottom: '2px solid #008060', padding: '8px 0', fontSize: 14 }}>All</button>
                        <button style={{ background: 'none', border: 'none', fontWeight: 600, color: '#6d7175', padding: '8px 0', fontSize: 14 }}>Active</button>
                        <button style={{ background: 'none', border: 'none', fontWeight: 600, color: '#6d7175', padding: '8px 0', fontSize: 14 }}>Draft</button>
                        <button style={{ background: 'none', border: 'none', fontWeight: 600, color: '#6d7175', padding: '8px 0', fontSize: 14 }}>Archived</button>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button className={styles.actionBtn} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Search size={14} /> Search</button>
                        <button className={styles.actionBtn} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Filter size={14} /> Filter</button>
                        <button className={styles.actionBtn} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><ArrowUpDown size={14} /> Sort</button>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className={styles.emptyStateContainer} style={{ border: 'none', boxShadow: 'none' }}>
                        <div style={{ marginBottom: 24 }}>
                            <EmptyProductIcon />
                        </div>
                        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Ready to add your first product?</h2>
                        <p style={{ color: '#6d7175', marginBottom: 24, maxWidth: 400 }}>
                            Build your catalog, manage inventory, and track performance across all sales channels.
                        </p>
                        <button
                            className={styles.primaryButton}
                            onClick={() => router.push('/admin/products/new')}
                            style={{ background: '#008060', borderRadius: 8, padding: '12px 24px' }}
                        >
                            Add product
                        </button>
                    </div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ width: 80, paddingLeft: 24 }}>Image</th>
                                <th>Product Name</th>
                                <th>Status</th>
                                <th>Inventory</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th style={{ width: 120, paddingRight: 24, textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => {
                                const currentId = product._id || product.id.toString();
                                return (
                                    <tr key={currentId}>
                                        <td style={{ paddingLeft: 24 }}>
                                            <div style={{ width: 48, height: 48, background: '#f6f6f7', borderRadius: 8, overflow: 'hidden', border: '1px solid #eee' }}>
                                                {product.images && product.images[0] ? (
                                                    <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}><Package size={24} /></div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1c1d' }}>{product.name}</div>
                                            <div style={{ fontSize: 12, color: '#8c9196' }}>ID: {currentId.slice(-6).toUpperCase()}</div>
                                        </td>
                                        <td><span className={styles.badgePaid} style={{ background: '#eefcf6', color: '#008060', fontWeight: 700, fontSize: 11 }}>ACTIVE</span></td>
                                        <td>
                                            <div style={{ fontSize: 14, fontWeight: 500 }}>34 in stock</div>
                                            <div style={{ fontSize: 12, color: '#8c9196' }}>Across 2 locations</div>
                                        </td>
                                        <td><span style={{ fontSize: 13, background: '#f6f6f7', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>{product.category || 'Apparel'}</span></td>
                                        <td><div style={{ fontWeight: 800 }}>₹{product.price?.toLocaleString()}</div></td>
                                        <td style={{ paddingRight: 24, textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                                <button
                                                    onClick={() => router.push(`/admin/products/${currentId}`)}
                                                    style={{ background: 'none', border: 'none', color: '#5c5f62', cursor: 'pointer', padding: 4 }}
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(currentId)}
                                                    style={{ background: 'none', border: 'none', color: '#d72c0d', cursor: 'pointer', padding: 4 }}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <div style={{ marginTop: 24, textAlign: 'center', padding: '24px 0' }}>
                <p style={{ color: '#8c9196', fontSize: 13 }}>Showing {products.length} products</p>
            </div>
        </div>
    );
}
