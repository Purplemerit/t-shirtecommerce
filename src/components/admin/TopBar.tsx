"use client";
import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import styles from '@/app/admin/admin.module.css';

export const TopBar = () => {
    return (
        <header className={styles.topBar}>
            <div className={styles.searchBar}>
                <Search size={18} color="#8c9196" />
                <input type="text" placeholder="Search orders, products, customers..." className={styles.searchInput} />
                <div style={{ fontSize: 11, color: '#8c9196', border: '1px solid #e1e3e5', borderRadius: 4, padding: '2px 6px', background: '#fff', fontWeight: 700 }}>⌘K</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <button style={{ color: '#5c5f62', background: 'none', border: 'none', cursor: 'pointer' }}><Bell size={20} /></button>
                <button style={{ color: '#5c5f62', background: 'none', border: 'none', cursor: 'pointer' }}><HelpCircle size={20} /></button>
                <div className={styles.userProfile} style={{ fontWeight: 700, fontSize: 13 }}>
                    MS
                </div>
            </div>
        </header>
    );
};
