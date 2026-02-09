"use client";
import React from 'react';
import styles from '@/app/admin/admin.module.css';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { MousePointer, Info } from 'lucide-react';

export default function AttributionPage() {
    return (
        <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 className={styles.pageTitle} style={{ gap: 8 }}>
                    <MousePointer size={22} /> Attribution
                </h1>
                <button className={styles.actionBtn}>Last non - direct click</button>
            </div>

            {/* Date Picker Placeholder */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                <button className={styles.actionBtn}>Last 30 days</button>
                <button className={styles.actionBtn}>No comparison</button>
            </div>

            {/* Chart */}
            <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5', marginBottom: 24 }}>
                <div style={{ fontSize: 13, color: '#333', fontWeight: 600, marginBottom: 20 }}>Sessions by top 5 channels over time</div>
                <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                            { name: '12 AM', value: 0 }, { name: '4 AM', value: 0 }, { name: '8 AM', value: 0 },
                            { name: '12 PM', value: 0 }, { name: '4 PM', value: 0 }, { name: '8 PM', value: 0 },
                            { name: '11 PM', value: 0 }
                        ]}>
                            <CartesianGrid vertical={false} stroke="#f1f1f1" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                            <Tooltip contentStyle={{ borderRadius: 8 }} />
                            <Line type="monotone" dataKey="value" stroke="#008060" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Info Box */}
            <div style={{ background: 'white', padding: 12, borderRadius: 8, border: '1px solid #e1e3e5', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 24 }}>
                <Info size={18} color="#008060" />
                <span style={{ fontSize: 14 }}>Creation of shopify Email activities is now managed from the app. <a href="#" style={{ color: '#008060', textDecoration: 'underline' }}>Open Email</a></span>
            </div>

            {/* Marketing Activity List */}
            <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e1e3e5', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f1f1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: 14 }}>Marketing app activities</h3>
                    <a href="#" style={{ fontSize: 13, color: '#008060', textDecoration: 'none' }}>Explore apps</a>
                </div>

                <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #e1e3e5', display: 'flex', fontSize: 12, color: '#666', fontWeight: 600 }}>
                    <div style={{ flex: 1.5 }}>Channel</div>
                    <div style={{ flex: 1 }}>Type</div>
                    <div style={{ width: 80 }}>Sessions</div>
                    <div style={{ width: 80 }}>Sales</div>
                    <div style={{ width: 80 }}>Orders</div>
                    <div style={{ width: 100 }}>Conv. Rate</div>
                </div>

                <div style={{ padding: '16px 20px', display: 'flex', fontSize: 14, borderBottom: '1px solid #f1f1f1' }}>
                    <div style={{ flex: 1.5 }}>Direct</div>
                    <div style={{ flex: 1, color: '#666' }}>direct</div>
                    <div style={{ width: 80 }}>15</div>
                    <div style={{ width: 80 }}>$0.00</div>
                    <div style={{ width: 80 }}>0</div>
                    <div style={{ width: 100 }}>0%</div>
                </div>
            </div>

        </div>
    );
}
