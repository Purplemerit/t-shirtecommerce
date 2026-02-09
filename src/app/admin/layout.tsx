"use client";
import React from 'react';
import styles from './admin.module.css';
import { Sidebar } from '@/components/admin/Sidebar';
import { TopBar } from '@/components/admin/TopBar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isAdmin } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        // Simple check: if user is not logged in or not an admin, redirect
        const storedUser = localStorage.getItem('faxico_user');
        if (!storedUser) {
            router.push('/login');
        } else {
            const parsed = JSON.parse(storedUser);
            if (parsed.role !== 'admin') {
                router.push('/');
            }
        }
    }, [router]);

    if (!user || user.role !== 'admin') {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={32} color="#ff4d00" />
            </div>
        );
    }

    return (
        <div className={styles.adminContainer}>
            <Sidebar />

            <div className={styles.mainContent}>
                <TopBar />

                <main className={styles.pageContent}>
                    {children}
                </main>
            </div>
        </div>
    );
}
