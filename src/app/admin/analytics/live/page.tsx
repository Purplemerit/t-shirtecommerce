"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { Loader2, RefreshCw, Maximize2, LayoutGrid, Globe as GlobeIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const GlobeVisualization = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Simulated Globe */}
            <div style={{
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #a5f3fc, #0891b2)',
                position: 'relative',
                boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.1), 0 0 50px rgba(8, 145, 178, 0.2)'
            }}>
                {/* Simulated Map Dots - Randomly positioned for effect */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0.3, scale: 0.8 }}
                        animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
                        style={{
                            position: 'absolute',
                            width: 4,
                            height: 4,
                            background: 'white',
                            borderRadius: '50%',
                            top: `${20 + Math.random() * 60}%`,
                            left: `${20 + Math.random() * 60}%`,
                            boxShadow: '0 0 4px white'
                        }}
                    />
                ))}

                {/* Main Pulse - Simulated activity info */}
                <motion.div
                    style={{ position: 'absolute', top: '40%', left: '45%', cursor: 'pointer' }}
                    whileHover={{ scale: 1.1 }}
                >
                    <div style={{ width: 12, height: 12, background: '#7c3aed', borderRadius: '50%', border: '2px solid white' }}></div>
                    <div style={{ position: 'absolute', top: -30, left: 15, background: 'white', padding: '4px 8px', borderRadius: 4, fontSize: 10, whiteSpace: 'nowrap', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                        New Order from Delhi
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default function LiveViewPage() {
    const [currentTime, setCurrentTime] = useState('');
    const [visitors, setVisitors] = useState(1);
    const [sales, setSales] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

            // Simulate live data changes
            if (Math.random() > 0.7) {
                setVisitors(prev => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)));
            }
            if (Math.random() > 0.95) {
                setSales(prev => prev + 500); // Occasional sale
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: 20, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h1 className={styles.pageTitle} style={{ margin: 0 }}>Live View</h1>
                    <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 6, height: 6, background: '#0284c7', borderRadius: '50%' }}></div>
                        Just now
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 13, marginRight: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 8, height: 8, background: '#a855f7', borderRadius: '50%' }}></div> Orders
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 8, height: 8, background: '#06b6d4', borderRadius: '50%' }}></div> Visitors right now
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 20, flex: 1, overflow: 'hidden' }}>
                {/* Left Panel - Metrics */}
                <div style={{ flex: 1, overflowY: 'auto', paddingRight: 10, display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* Row 1 */}
                    <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ flex: 1, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                            <div style={{ fontSize: 13, color: '#333' }}>Visitors right now</div>
                            <div style={{ fontSize: 24, fontWeight: 700, margin: '8px 0' }}>{visitors}</div>
                        </div>
                        <div style={{ flex: 1, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                            <div style={{ fontSize: 13, color: '#333' }}>Total sales</div>
                            <div style={{ fontSize: 24, fontWeight: 700, margin: '8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                ₹{sales}
                                <div style={{ height: 20, width: 60, background: '#e0f2fe' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ flex: 1, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                            <div style={{ fontSize: 13, color: '#333' }}>Sessions</div>
                            <div style={{ fontSize: 24, fontWeight: 700, margin: '8px 0' }}>133 <span style={{ fontSize: 14, color: '#22c55e' }}>1.4K%</span></div>
                            <div style={{ height: 4, background: '#f0f0f0', width: '100%', borderRadius: 2 }}><div style={{ width: '40%', background: '#3b82f6', height: '100%' }}></div></div>
                        </div>
                        <div style={{ flex: 1, background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                            <div style={{ fontSize: 13, color: '#333' }}>Orders</div>
                            <div style={{ fontSize: 24, fontWeight: 700, margin: '8px 0' }}>0</div>
                            <div style={{ height: 4, background: '#f0f0f0', width: '100%', borderRadius: 2 }}><div style={{ width: '0%', background: '#3b82f6', height: '100%' }}></div></div>
                        </div>
                    </div>

                    {/* Customer Behavior */}
                    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h3 style={{ fontSize: 14, margin: '0 0 16px 0' }}>Customer behaviour</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <div style={{ flex: 1, borderRight: '1px solid #f0f0f0', paddingRight: 10 }}>
                                <div style={{ color: '#666', marginBottom: 4 }}>Active carts</div>
                                <div style={{ fontSize: 16, fontWeight: 600 }}>0</div>
                            </div>
                            <div style={{ flex: 1, borderRight: '1px solid #f0f0f0', paddingLeft: 10, paddingRight: 10 }}>
                                <div style={{ color: '#666', marginBottom: 4 }}>Checking out</div>
                                <div style={{ fontSize: 16, fontWeight: 600 }}>0</div>
                            </div>
                            <div style={{ flex: 1, paddingLeft: 10 }}>
                                <div style={{ color: '#666', marginBottom: 4 }}>Purchased</div>
                                <div style={{ fontSize: 16, fontWeight: 600 }}>0</div>
                            </div>
                        </div>
                    </div>

                    {/* Sessions by location */}
                    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                        <h3 style={{ fontSize: 14, margin: '0 0 16px 0' }}>Sessions by location</h3>

                        <div style={{ marginBottom: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                                <span style={{ color: '#666' }}>United states - iowa - council bluffs</span>
                                <span>101</span>
                            </div>
                            <div style={{ height: 8, background: '#e0f2fe', borderRadius: 4, width: '100%' }}>
                                <div style={{ height: '100%', background: '#0284c7', width: '80%', borderRadius: 4 }}></div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                                <span style={{ color: '#666' }}>United states - california - Los Angeles</span>
                                <span>8</span>
                            </div>
                            <div style={{ height: 8, background: '#e0f2fe', borderRadius: 4, width: '100%' }}>
                                <div style={{ height: '100%', background: '#0284c7', width: '10%', borderRadius: 4 }}></div>
                            </div>
                        </div>

                    </div>

                    {/* New vs Returning */}
                    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5', height: 150, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: 14, margin: '0 0 16px 0' }}>New vs returning customers</h3>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 12 }}>
                            No data for this data range
                        </div>
                    </div>

                    {/* Sales by product */}
                    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e1e3e5', height: 150, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: 14, margin: '0 0 16px 0' }}>Total sales by product</h3>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 12 }}>
                            No data for this data range
                        </div>
                    </div>
                </div>

                {/* Right Panel - Globe */}
                <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GlobeVisualization />
                </div>
            </div>
        </div>
    );
}
