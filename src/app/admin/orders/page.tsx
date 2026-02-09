"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EmptyStateIcon = () => (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="80" fill="#F1F2F3" />
        <g filter="url(#shadow)">
            <rect x="50" y="40" width="80" height="100" rx="4" fill="white" />
        </g>
        <rect x="50" y="40" width="80" height="24" rx="4" fill="#F9FAFB" />
        <path d="M50 64H130" stroke="#E5E7EB" />
        <rect x="60" y="48" width="16" height="8" rx="2" fill="#DBDBDB" />
        <rect x="82" y="48" width="8" height="8" rx="2" fill="#DBDBDB" />
        <rect x="96" y="48" width="8" height="8" rx="2" fill="#DBDBDB" />
        <rect x="60" y="74" width="24" height="24" rx="2" fill="#E5E7EB" />
        <path d="M66 90L71 85L76 90" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="78" cy="80" r="1.5" fill="white" />
        <rect x="92" y="74" width="30" height="6" rx="3" fill="#E5E7EB" />
        <rect x="92" y="84" width="20" height="6" rx="3" fill="#F3F4F6" />
        <rect x="60" y="108" width="60" height="6" rx="3" fill="#F3F4F6" />
        <rect x="60" y="120" width="40" height="6" rx="3" fill="#F3F4F6" />
        <defs>
            <filter id="shadow" x="40" y="30" width="100" height="120" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="6" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
        </defs>
    </svg>
);

interface Order {
    id: string;
    customer: string;
    amount: string;
    status: string;
    date: string;
    _id: string;
}

export default function OrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCreateMockOrder = async () => {
        setCreating(true);
        try {
            const mockOrder = {
                orderId: `#FX-${Math.floor(10000 + Math.random() * 90000)}`,
                shippingInfo: { fullName: 'Test Viewer' },
                amount: Math.floor(Math.random() * 500) + 50,
                status: 'pending',
                items: []
            };

            await fetch('/api/admin/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mockOrder)
            });

            // Refresh list
            fetchOrders();
        } catch (e) {
            console.error(e);
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.emptyStateContainer} style={{ height: '100vh', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={32} />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className={styles.pageHeader}>
                <div className={styles.pageTitle} style={{ gap: 12 }}>
                    Orders
                    <div style={{
                        marginTop: 2,
                        padding: '4px 8px',
                        background: '#e4e5e7',
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 500,
                        color: '#494b4d',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        cursor: 'pointer'
                    }}>
                        All locations <ChevronDown size={12} />
                    </div>
                </div>
                {orders.length > 0 && (
                    <button
                        className={styles.primaryButton}
                        onClick={handleCreateMockOrder}
                        disabled={creating}
                    >
                        {creating ? 'Creating...' : 'Create order'}
                    </button>
                )}
            </div>

            {orders.length === 0 ? (
                <div className={styles.emptyStateContainer}>
                    <div style={{ marginBottom: 20 }}>
                        <EmptyStateIcon />
                    </div>
                    <h2 className={styles.emptyStateTitle} style={{ fontSize: 16, marginBottom: 8 }}>Your orders will show here</h2>
                    <p className={styles.emptyStateDescription} style={{ marginBottom: 24, alignSelf: 'center' }}>
                        This is where you'll fulfill orders, collect payments, and track order progress.
                    </p>
                    <button
                        className={styles.primaryButton}
                        onClick={handleCreateMockOrder}
                        disabled={creating}
                    >
                        {creating ? 'Creating...' : 'Create order'}
                    </button>
                </div>
            ) : (
                <div className={styles.ordersSection} style={{ backgroundColor: 'white', border: '1px solid #e1e3e5', borderRadius: 8, overflow: 'hidden' }}>
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ background: '#f9fafb' }}>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Payment status</th>
                                <th>Fulfillment status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr
                                    key={order._id}
                                    onClick={() => router.push(`/admin/orders/${order._id}`)}
                                    style={{ cursor: 'pointer' }}
                                    className="hover:bg-gray-50" // Assuming tailwind utility or equivalent, or rely on JS pointer
                                >
                                    <td style={{ fontWeight: 600 }}>{order.id}</td>
                                    <td>{order.date}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.amount}</td>
                                    <td>
                                        <span className={
                                            order.status === 'paid' ? styles.badgePaid :
                                                order.status === 'pending' ? styles.badgePending :
                                                    styles.badgeWarning
                                        }>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                    <td><span className={styles.badgeWarning}>Unfulfilled</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
