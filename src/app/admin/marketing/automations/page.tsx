"use client";
import React from 'react';
import styles from '@/app/admin/admin.module.css';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Settings, Zap } from 'lucide-react';

const automationStats = [
    { name: 'Reach', value: '0' },
    { name: 'Sessions', value: '0' },
    { name: 'Orders', value: '0' },
    { name: 'Conversion', value: '0%' },
    { name: 'Sales', value: '₹0.00' },
    { name: 'AOV', value: '₹0.00' }
];

export default function AutomationsPage() {
    return (
        <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 className={styles.pageTitle} style={{ gap: 8 }}>
                    <Settings size={22} /> Automations
                </h1>
                <button className={styles.actionBtn}>View templates</button>
            </div>

            {/* Date Picker Placeholder */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                <div style={{ padding: '6px 12px', background: 'white', border: '1px solid #ccc', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    Jan 5–Feb 3, 2026 vs Dec 6, 2025–Jan 4, 2026
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 30 }}>
                {automationStats.map((stat, i) => (
                    <div key={i} style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>{stat.name}</div>
                        <div style={{ fontSize: 20, fontWeight: 600 }}>{stat.value}</div>
                        <div style={{ height: 4, background: '#f0f0f0', marginTop: 12, borderRadius: 2 }}>
                            <div style={{ width: 0, height: '100%', background: '#ccc' }}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Automation List */}
            <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e1e3e5', overflow: 'hidden', marginBottom: 30 }}>
                <div style={{ padding: '12px 20px', borderBottom: '1px solid #f1f1f1', display: 'flex', fontSize: 12, color: '#666', fontWeight: 500 }}>
                    <div style={{ flex: 2 }}>Marketing automation</div>
                    <div style={{ width: 80 }}>Status</div>
                    <div style={{ width: 60, textAlign: 'right' }}>Reach</div>
                    <div style={{ width: 60, textAlign: 'right' }}>Sessions</div>
                    <div style={{ width: 60, textAlign: 'right' }}>Orders</div>
                    <div style={{ width: 100, textAlign: 'right' }}>Conversion rate</div>
                    <div style={{ width: 80, textAlign: 'right' }}>Sales</div>
                    <div style={{ width: 120, textAlign: 'right' }}>AOV</div>
                </div>
                <div style={{ padding: '20px', display: 'flex', alignItems: 'center', fontSize: 14 }}>
                    <div style={{ flex: 2, fontWeight: 500 }}>Recover abandoned checkout</div>
                    <div style={{ width: 80 }}><span className={styles.badgeSuccess} style={{ borderRadius: 4 }}>Active</span></div>
                    <div style={{ width: 60, textAlign: 'right', color: '#999' }}>—</div>
                    <div style={{ width: 60, textAlign: 'right', color: '#999' }}>—</div>
                    <div style={{ width: 60, textAlign: 'right', color: '#999' }}>—</div>
                    <div style={{ width: 100, textAlign: 'right', color: '#999' }}>—</div>
                    <div style={{ width: 80, textAlign: 'right', color: '#999' }}>—</div>
                    <div style={{ width: 120, textAlign: 'right', color: '#999' }}>—</div>
                </div>
            </div>

            {/* Flow Banner */}
            <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: 16 }}>Manage automations in Flow</h3>
                    <p style={{ margin: 0, fontSize: 14, color: '#666' }}>View, edit, import, export, and duplicate automations by installing Flow.</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button style={{ background: '#8cc642', color: 'white', border: 'none', borderRadius: 20, padding: '8px 20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Zap size={16} fill="white" /> Shopify Flow
                    </button>
                    <button className={styles.actionBtn}>Install</button>
                </div>
            </div>

        </div>
    );
}
