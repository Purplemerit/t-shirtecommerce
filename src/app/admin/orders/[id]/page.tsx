"use client";

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/admin.module.css';
import { Package, Truck, Check, AlertCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface Order {
    _id: string;
    orderId: string;
    items: {
        productId: string;
        name: string;
        quantity: number;
        price: number;
        size?: string;
        image?: string;
    }[];
    shippingInfo: {
        fullName: string;
        email: string;
        address: string;
        city: string;
        country: string;
        postalCode: string;
    };
    amount: number;
    status: string;
    createdAt: string;
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const fetchOrder = async () => {
        try {
            const res = await fetch(`/api/admin/orders/${id}`);
            if (res.ok) {
                const data = await res.json();
                setOrder(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const updateStatus = async (newStatus: string) => {
        setUpdating(true);
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                const updated = await res.json();
                setOrder(updated);
            }
        } catch (error) {
            console.error('Failed to update order', error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
    if (!order) return <div style={{ padding: 40, textAlign: 'center' }}>Order not found</div>;

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <button
                    onClick={() => router.back()}
                    style={{ background: 'none', border: '1px solid #ccc', borderRadius: 4, padding: 6, cursor: 'pointer' }}
                >
                    <ArrowLeft size={16} />
                </button>
                <h1 className={styles.pageTitle} style={{ margin: 0 }}>{order.orderId}</h1>
                <span className={styles.badgeSuccess} style={{ fontSize: 13, padding: '4px 8px' }}>
                    {order.status}
                </span>
                <span style={{ fontSize: 13, color: '#666', marginLeft: 'auto' }}>
                    {new Date(order.createdAt).toLocaleString()}
                </span>
            </div>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {/* Main Content */}
                <div style={{ flex: 2, minWidth: 300 }}>
                    <div style={{ background: 'white', border: '1px solid #e1e3e5', borderRadius: 8, padding: 20, marginBottom: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                            <h3 style={{ margin: 0, fontSize: 16 }}>Unfulfilled</h3>
                            <button className={styles.actionBtn} onClick={() => updateStatus('shipped')} disabled={updating || order.status === 'shipped'}>
                                {order.status === 'shipped' ? 'Fulfilled' : 'Fulfill items'}
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {order.items.map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', borderBottom: i < order.items.length - 1 ? '1px solid #f1f1f1' : 'none', paddingBottom: i < order.items.length - 1 ? 16 : 0 }}>
                                    <div style={{ width: 60, height: 60, background: '#f4f4f4', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                                        {item.image ? (
                                            <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                                        ) : (
                                            <Package size={24} color="#ccc" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                        )}
                                        <div style={{ position: 'absolute', top: -5, right: -5, background: '#666', color: 'white', borderRadius: '50%', width: 20, height: 20, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 500, color: '#0078d4' }}>{item.name}</div>
                                        {item.size && <div style={{ fontSize: 13, color: '#666' }}>Size: {item.size}</div>}
                                        <div style={{ fontSize: 13, color: '#666' }}>₹{item.price}</div>
                                    </div>
                                    <div style={{ fontWeight: 500 }}>
                                        ₹{item.price * item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: 'white', border: '1px solid #e1e3e5', borderRadius: 8, padding: 20 }}>
                        <h3 style={{ margin: '0 0 16px 0', fontSize: 16 }}>Payment</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                            <span>Subtotal</span>
                            <span>₹{order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 16 }}>
                            <span>Shipping</span>
                            <span>₹0.00</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, borderTop: '1px solid #f1f1f1', paddingTop: 16 }}>
                            <span>Total</span>
                            <span>₹{order.amount}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginTop: 16, color: '#666' }}>
                            <span>Paid via Razorpay</span>
                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ flex: 1, minWidth: 250, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ background: 'white', border: '1px solid #e1e3e5', borderRadius: 8, padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                            <h3 style={{ margin: 0, fontSize: 14, color: '#666' }}>Customer</h3>
                        </div>
                        <div style={{ color: '#0078d4', marginBottom: 4 }}>{order.shippingInfo?.email}</div>
                        <div style={{ marginBottom: 12 }}>1 order</div>

                        <h4 style={{ margin: '12px 0 8px 0', fontSize: 13, color: '#666' }}>Contact information</h4>
                        <div style={{ fontSize: 14 }}>{order.shippingInfo?.email}</div>

                        <h4 style={{ margin: '16px 0 8px 0', fontSize: 13, color: '#666' }}>Shipping address</h4>
                        <div style={{ fontSize: 14 }}>
                            {order.shippingInfo?.fullName}<br />
                            {order.shippingInfo?.address}<br />
                            {order.shippingInfo?.city} {order.shippingInfo?.postalCode}<br />
                            {order.shippingInfo?.country}
                        </div>

                        <h4 style={{ margin: '16px 0 8px 0', fontSize: 13, color: '#666' }}>Billing address</h4>
                        <div style={{ fontSize: 14, color: '#666' }}>Same as shipping address</div>
                    </div>

                    <div style={{ background: 'white', border: '1px solid #e1e3e5', borderRadius: 8, padding: 20 }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#666' }}>Notes</h3>
                        <div style={{ fontSize: 14, color: '#999', fontStyle: 'italic' }}>No notes from customer</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
