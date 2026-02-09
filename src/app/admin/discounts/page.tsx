"use client";
import React, { useState, useEffect } from 'react';
import styles from '@/app/admin/admin.module.css';
import { useRouter } from 'next/navigation';
import { Percent, Loader2 } from 'lucide-react';

export default function DiscountsPage() {
    const router = useRouter();
    const [discounts, setDiscounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDiscounts = async () => {
        try {
            const res = await fetch('/api/admin/discounts');
            if (res.ok) {
                const data = await res.json();
                setDiscounts(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiscounts();
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
                <h1 className={styles.pageTitle}>Discounts</h1>
                <button
                    className={styles.primaryButton}
                    onClick={() => router.push('/admin/discounts/new')}
                >
                    Create discount
                </button>
            </div>

            <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e1e3e5', overflow: 'hidden', minHeight: 400 }}>
                {discounts.length === 0 ? (
                    <div style={{ padding: 40, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: 60, height: 60, background: '#f4f4f4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <Percent size={24} color="#5c5f62" />
                        </div>
                        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Manage discounts and promotions</h2>
                        <p style={{ color: '#666', maxWidth: 400, marginBottom: 24 }}>
                            Create discount codes and automatic discounts that apply at checkout.
                        </p>
                        <button
                            className={styles.primaryButton}
                            onClick={() => router.push('/admin/discounts/new')}
                        >
                            Create discount
                        </button>
                    </div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ background: '#f9fafb' }}>
                                <th>Code</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Used</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map(d => (
                                <tr key={d._id}>
                                    <td style={{ fontWeight: 600 }}>{d.code} <span style={{ fontWeight: 400, color: '#666', fontSize: 13, marginLeft: 8 }}>{d.value}{d.type === 'percentage' ? '%' : ' INR'} off</span></td>
                                    <td><span className={styles.badgeSuccess}>{d.status}</span></td>
                                    <td>{d.type.replace('_', ' ')}</td>
                                    <td>{d.usedCount} used</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
