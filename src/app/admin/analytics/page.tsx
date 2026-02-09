"use client";
import React, { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar,
    AreaChart, Area
} from 'recharts';
import styles from '@/app/admin/admin.module.css';
import { Calendar, Loader2 } from 'lucide-react';

interface HourlyData {
    name: string;
    sales: number;
    sessions: number;
    orders: number;
}

interface AnalyticsData {
    hourlyData: HourlyData[];
    stats: {
        totalSales: number;
        totalOrders: number;
        conversionRate: number;
    };
    locationData: { name: string; value: number }[];
}

const StatCard = ({ title, value, change, chartColor, data, dataKey }: { title: string, value: string, change?: string, chartColor?: string, data?: any[], dataKey?: string }) => (
    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5', minWidth: 200, flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{value}</div>
        {change && (
            <div style={{ fontSize: 12, color: change.startsWith('+') ? 'green' : 'red', display: 'flex', alignItems: 'center' }}>
                {change}
                <span style={{ color: '#999', marginLeft: 4 }}>vs last period</span>
            </div>
        )}
        <div style={{ height: 40, marginTop: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data || []}>
                    <Line type="monotone" dataKey={dataKey || "value"} stroke={chartColor || "#8884d8"} strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/analytics');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={32} />
            </div>
        );
    }

    if (!data) return <div>Failed to load data</div>;

    const { hourlyData, stats, locationData } = data;

    return (
        <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 className={styles.pageTitle}>Analytics</h1>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className={styles.actionBtn} style={{ background: 'white', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={14} /> Today
                    </button>
                </div>
            </div>

            {/* Top Stats Row */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
                <StatCard
                    title="Total sales"
                    value={`₹${stats.totalSales.toLocaleString()}`}
                    change="+12%"
                    chartColor="#008060"
                    data={hourlyData}
                    dataKey="sales"
                />
                <StatCard
                    title="Sessions"
                    value={hourlyData.reduce((a, b) => a + b.sessions, 0).toLocaleString()}
                    change="-5%"
                    chartColor="#0078d4"
                    data={hourlyData}
                    dataKey="sessions"
                />
                <StatCard
                    title="Orders"
                    value={stats.totalOrders.toString()}
                    change="+2%"
                    chartColor="#666"
                    data={hourlyData}
                    dataKey="orders"
                />
                <StatCard
                    title="Conversion rate"
                    value={`${stats.conversionRate.toFixed(2)}%`}
                    change="+0.4%"
                    chartColor="#008060"
                    data={hourlyData}
                    dataKey="orders" // Proxy for conversion trend
                />
            </div>

            {/* Main Chart Section */}
            <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5', marginBottom: 24 }}>
                <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: 16 }}>Total sales breakdown</h3>
                    <div style={{ fontSize: 13, color: '#666' }}>Last 24 hours</div>
                </div>
                <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={hourlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#008060" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#008060" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} interval={3} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} tickFormatter={(val) => `₹${val}`} />
                            <CartesianGrid vertical={false} stroke="#f1f1f1" />
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} formatter={(value) => [`₹${value}`, 'Sales']} labelStyle={{ color: '#666' }} />
                            <Area type="monotone" dataKey="sales" stroke="#008060" fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Secondary Charts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>

                {/* Sales by Channel - keeping mock for now as we don't have channel data */}
                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: 16 }}>Sales by channel</h3>
                    <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Online Store', value: stats.totalSales },
                                { name: 'Point of Sale', value: 0 },
                                { name: 'Social', value: 0 }
                            ]} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid horizontal={false} stroke="#f1f1f1" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{ fontSize: 13 }} />
                                <Tooltip cursor={{ fill: '#f9f9f9' }} />
                                <Bar dataKey="value" fill="#008060" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sessions by Location - Real Data */}
                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: 16 }}>Orders by location</h3>
                    <div style={{ height: 200 }}>
                        {locationData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={locationData} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid horizontal={false} stroke="#f1f1f1" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{ fontSize: 13 }} />
                                    <Tooltip cursor={{ fill: '#f9f9f9' }} />
                                    <Bar dataKey="value" fill="#0078d4" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>No location data available</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
