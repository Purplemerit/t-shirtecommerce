"use client";
import React from 'react';
import styles from './admin.module.css';
import { Sidebar } from '@/components/admin/Sidebar';
import { TopBar } from '@/components/admin/TopBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.adminContainer}>
            {/* Sidebar - Component includes styles.sidebar */}
            <Sidebar />

            <div className={styles.mainContent}>
                {/* TopBar - Component includes styles.topBar */}
                <TopBar />

                <main className={styles.pageContent}>
                    {children}
                </main>
            </div>
        </div>
    );
}
