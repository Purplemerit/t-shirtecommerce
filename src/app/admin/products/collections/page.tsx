"use client";
import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { useRouter } from 'next/navigation';
import { Layers, Loader2 } from 'lucide-react';

export default function CollectionsPage() {
    const router = useRouter();
    const [collections, setCollections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCollections = async () => {
        try {
            const res = await fetch('/api/admin/collections');
            if (res.ok) {
                const data = await res.json();
                setCollections(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    if (loading) {
        return (
            <div className={styles.emptyStateContainer} style={{ height: '100vh', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={32} />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: 50 }}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Collections</h1>
                <button
                    className={styles.primaryButton}
                    onClick={() => router.push('/admin/products/collections/new')}
                >
                    Create collection
                </button>
            </div>

            <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e1e3e5', overflow: 'hidden', minHeight: 400 }}>
                {collections.length === 0 ? (
                    <div style={{ padding: 40, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: 60, height: 60, background: '#f4f4f4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <Layers size={24} color="#5c5f62" />
                        </div>
                        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Group your products into collections</h2>
                        <p style={{ color: '#666', maxWidth: 400, marginBottom: 24 }}>
                            Use collections to organize your products, making it easier for customers to discover them.
                        </p>
                        <button
                            className={styles.primaryButton}
                            onClick={() => router.push('/admin/products/collections/new')}
                        >
                            Create collection
                        </button>
                    </div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ background: '#f9fafb' }}>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Products</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections.map(c => (
                                <tr key={c._id}>
                                    <td style={{ fontWeight: 600 }}>{c.title}</td>
                                    <td>{c.type === 'automated' ? 'Automated' : 'Manual'}</td>
                                    <td>{c.products?.length || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
