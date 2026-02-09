"use client";
import React from 'react';
import styles from '@/app/admin/admin.module.css';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Megaphone, Plus } from 'lucide-react';

export default function CampaignsPage() {
    return (
        <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 className={styles.pageTitle} style={{ gap: 8 }}>
                    <Megaphone size={22} /> Campaigns
                </h1>
                <button className={styles.primaryButton}>Create campaign</button>
            </div>

            {/* Campaign Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>

                <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Sessions</h3>
                    <div style={{ height: 120 }}>
                        <ResponsiveContainer>
                            <BarChart data={[{ name: 'A', value: 10 }, { name: 'B', value: 30 }]} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="3 3" />
                                <Bar dataKey="value" fill="#e1e3e5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Sales</h3>
                    <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 12 }}>
                        No data
                    </div>
                </div>

                <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Orders</h3>
                    <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 12 }}>
                        No data
                    </div>
                </div>

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 20, marginTop: 20 }}>
                {/* Main Content Area */}
                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5', minHeight: 400 }}>
                    <h3 style={{ fontSize: 16, margin: '0 0 16px 0' }}>Campaign Details</h3>
                    <p style={{ color: '#666', fontSize: 14 }}>Select a campaign to view details or create a new one.</p>
                </div>

                {/* Sidebar Widgets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: 13, fontWeight: 600 }}>Shareable links</h4>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 8, background: '#f9fafb', borderRadius: 4 }}>
                            <div style={{ width: 24, height: 24, background: '#ddd', borderRadius: 4 }}></div>
                            <div style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>/marketing/camp...</div>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: 13, fontWeight: 600 }}>Auto-match rules</h4>
                        <p style={{ fontSize: 12, color: '#666' }}>Automatically assign traffic based on UTM parameters.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
