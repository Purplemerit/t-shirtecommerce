"use client";

import React, { useEffect, useState } from 'react';
import styles from './admin.module.css';
import { Package, Users, DollarSign, TrendingUp, ChevronRight, Activity, Calendar, ShoppingCart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Stats {
    revenue: number;
    orders: number;
    customers: number;
    growth: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.ok) setStats(await res.json());
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    if (!stats) return (
        <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ height: 100, background: '#fff', borderRadius: 16, animation: 'pulse 1.5s infinite' }} />
            <div style={{ height: 400, background: '#fff', borderRadius: 16, animation: 'pulse 1.5s infinite' }} />
        </div>
    );

    return (
        <div className={styles.dashboard}>
            <div className={styles.cardHeader} style={{ marginBottom: 30 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Dashboard Overview</h1>
                    <p style={{ color: '#6d7175', margin: '5px 0 0' }}>Welcome back! Here's what's happening today.</p>
                </div>
                <button className={styles.primaryButton} style={{ borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Calendar size={18} /> Last 30 Days <ChevronRight size={14} />
                </button>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.iconBox} style={{ background: '#eefcf6', color: '#008060' }}>
                        <DollarSign size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p>Total Revenue</p>
                        <h3>{formatCurrency(stats.revenue)}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#008060', fontSize: 12, marginTop: 4, fontWeight: 700 }}>
                            <ArrowUpRight size={14} /> +12.5% <span>vs last month</span>
                        </div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.iconBox} style={{ background: '#f0f4ff', color: '#2c6ecb' }}>
                        <ShoppingCart size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p>Total Orders</p>
                        <h3>{stats.orders}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#008060', fontSize: 12, marginTop: 4, fontWeight: 700 }}>
                            <ArrowUpRight size={14} /> +8.2% <span>vs last month</span>
                        </div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.iconBox} style={{ background: '#fff4e5', color: '#8a6116' }}>
                        <Users size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p>New Customers</p>
                        <h3>{stats.customers}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#d72c0d', fontSize: 12, marginTop: 4, fontWeight: 700 }}>
                            <ArrowDownRight size={14} /> -2.4% <span>vs last month</span>
                        </div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.iconBox} style={{ background: '#fafafa', color: '#1a1c1d' }}>
                        <Activity size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p>Growth Rate</p>
                        <h3>{stats.growth}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#008060', fontSize: 12, marginTop: 4, fontWeight: 700 }}>
                            <ArrowUpRight size={14} /> +5.0% <span>since yesterday</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.dashboardGrid}>
                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2>Sales Trends</h2>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <span style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, background: '#008060', borderRadius: '50%' }} /> This Period</span>
                            <span style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, background: '#e1e3e5', borderRadius: '50%' }} /> Previous Period</span>
                        </div>
                    </div>
                    <div className={styles.placeholderChart}>
                        <div style={{ textAlign: 'center' }}>
                            <TrendingUp size={48} style={{ opacity: 0.2, marginBottom: 10 }} />
                            <p>Real-time data visualization module loading...</p>
                        </div>
                    </div>
                </div>

                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2>Recent Activity</h2>
                        <button style={{ color: '#008060', fontWeight: 600, fontSize: 13 }}>View All</button>
                    </div>
                    <div className={styles.activityList}>
                        {[
                            { user: 'Anjali R.', action: 'placed a new order', time: '2 minutes ago', avatar: 'A' },
                            { user: 'Riya S.', action: 'signed up as a customer', time: '1 hour ago', avatar: 'R' },
                            { user: 'Deepak K.', action: 'requested a return', time: '3 hours ago', avatar: 'D' },
                            { user: 'System', action: 'completed daily backup', time: '5 hours ago', avatar: 'S' },
                            { user: 'Admin', action: 'updated product inventory', time: 'Yesterday', avatar: 'M' }
                        ].map((item, i) => (
                            <div key={i} className={styles.activityItem}>
                                <div className={styles.activityCircle} style={{ background: i % 2 === 0 ? '#eefcf6' : '#f0f4ff', color: i % 2 === 0 ? '#008060' : '#2c6ecb', fontWeight: 700, fontSize: 12 }}>
                                    {item.avatar}
                                </div>
                                <div className={styles.activityContent}>
                                    <p><strong>{item.user}</strong> {item.action}</p>
                                    <span>{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
