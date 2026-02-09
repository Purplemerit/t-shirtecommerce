"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/app/admin/admin.module.css';
import { Construction } from 'lucide-react';

export default function ComingSoon() {
    const pathname = usePathname();
    // Safely parse pathname for title
    const title = pathname
        ? pathname.split('/').pop()?.replace(/-/g, ' ') || 'Page'
        : 'Page';

    return (
        <div style={{ padding: 20 }}>
            <h1 className={styles.pageTitle} style={{ marginBottom: 40, textTransform: 'capitalize' }}>{title}</h1>
            <div className={styles.emptyStateContainer} style={{ height: 400 }}>
                <div style={{ background: '#f4f6f8', padding: 24, borderRadius: '50%', marginBottom: 20 }}>
                    <Construction size={48} color="#5c5f62" />
                </div>
                <h2 className={styles.emptyStateTitle}>Coming Soon</h2>
                <p className={styles.emptyStateDescription}>
                    This feature is currently under development. Check back later!
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button className={styles.primaryButton} onClick={() => window.history.back()}>Go Back</button>
                    <button className={styles.actionBtn} onClick={() => window.location.href = '/admin'}>Dashboard</button>
                </div>
            </div>
        </div>
    );
}
