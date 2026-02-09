"use client";
import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { useRouter } from 'next/navigation';
import { Store, Globe, CreditCard, Box, User, ShieldCheck, Mail, Map } from 'lucide-react';

export default function SettingsPage() {
    const router = useRouter();

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Settings</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: 20 }}>
                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className={styles.navItem} style={{ background: '#f4f6f8', borderRadius: 4, fontWeight: 500 }}>
                        <Store size={18} style={{ marginRight: 10 }} />
                        Store details
                    </div>
                    <div className={styles.navItem} style={{ borderRadius: 4 }}>
                        <Globe size={18} style={{ marginRight: 10 }} />
                        Plan
                    </div>
                    <div className={styles.navItem} style={{ borderRadius: 4 }}>
                        <CreditCard size={18} style={{ marginRight: 10 }} />
                        Billing
                    </div>
                    <div className={styles.navItem} style={{ borderRadius: 4 }}>
                        <User size={18} style={{ marginRight: 10 }} />
                        Users and permissions
                    </div>
                    <div className={styles.navItem} style={{ borderRadius: 4 }}>
                        <Box size={18} style={{ marginRight: 10 }} />
                        Shipping and delivery
                    </div>
                </div>

                {/* Content */}
                <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e1e3e5', padding: 20 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Store details</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Store name</label>
                            <input
                                defaultValue="Winter '24"
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Store contact email</label>
                            <input
                                defaultValue="support@winter24.com"
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Store phone</label>
                            <input
                                defaultValue="+1 555-0123"
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Sender email</label>
                            <input
                                defaultValue="noreply@winter24.com"
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            />
                        </div>
                    </div>

                    <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, marginTop: 30 }}>Store currency</h3>
                    <div>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Store currency</label>
                        <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}>
                            <option value="INR">Indian Rupee (INR)</option>
                            <option value="USD">US Dollar (USD)</option>
                        </select>
                        <p style={{ fontSize: 13, color: '#666', marginTop: 6 }}>This is the currency your products are sold in.</p>
                    </div>

                    <div style={{ marginTop: 30, display: 'flex', justifyContent: 'flex-end' }}>
                        <button className={styles.primaryButton}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
