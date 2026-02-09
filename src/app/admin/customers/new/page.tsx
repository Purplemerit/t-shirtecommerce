"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';

export default function NewCustomerPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password || "123456", // Default if not provided
            role: 'user',
            phone: formData.phone,
            address: formData.address
        };

        try {
            const res = await fetch('/api/admin/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to create customer');

            router.push('/admin/customers');
        } catch (error) {
            console.error(error);
            alert('Failed to create customer');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle} style={{ fontSize: 24 }}>Add Customer</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ fontSize: 16, marginBottom: 16 }}>Customer Overview</h3>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            placeholder="John Doe"
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            placeholder="john@example.com"
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Phone (optional)</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            placeholder="+91..."
                        />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Password</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            placeholder="Leave empty for default (123456)"
                        />
                    </div>
                </div>

                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ fontSize: 16, marginBottom: 16 }}>Address</h3>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Default Address (optional)</label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            placeholder="123 Main St, City, Country"
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                    <button type="button" onClick={() => router.back()} className={styles.actionBtn} style={{ padding: '10px 20px' }}>Discard</button>
                    <button type="submit" disabled={submitting} className={styles.primaryButton} style={{ padding: '10px 20px' }}>
                        {submitting ? 'Saving...' : 'Save customer'}
                    </button>
                </div>
            </form>
        </div>
    );
}
