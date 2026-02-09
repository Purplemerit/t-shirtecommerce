"use client";

import React, { useState, useEffect } from 'react';
import { User, Package, LogOut, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './account.module.css';
import { useRouter } from 'next/navigation';

const AccountPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { user, logout } = useAuth();
    const router = useRouter();

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        birthday: ''
    });

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch Profile
                const profileRes = await fetch('/api/user/profile', {
                    method: 'POST', // Using POST to send email securely in body if strict generic fetch
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user.email })
                });
                const profileData = await profileRes.json();
                if (profileData.success) {
                    setProfile({ ...profile, ...profileData.profile });
                }

                // Fetch Orders
                const ordersRes = await fetch('/api/user/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user.email })
                });
                const ordersData = await ordersRes.json();
                if (ordersData.success) {
                    setOrders(ordersData.orders);
                }
            } catch (e) {
                console.error("Failed to load user data", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, router]);

    const handleSaveProfile = async () => {
        try {
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user?.email, updates: profile })
            });
            const data = await res.json();
            if (data.success) {
                alert('Profile updated successfully!');
            }
        } catch (e) {
            alert('Failed to update profile');
        }
    };

    if (!user) return null;

    return (
        <div className={`container ${styles.accountPage}`}>
            <div className={styles.header}>
                <h1>Your Account</h1>
                <p>Manage your orders and personal details.</p>
                <div className={styles.tabs}>
                    <button
                        className={activeTab === 'profile' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={activeTab === 'orders' ? styles.activeTab : ''}
                        onClick={() => setActiveTab('orders')}
                    >
                        Your Orders
                    </button>
                    <button onClick={logout} className={styles.logoutBtn}>Logout</button>
                </div>
            </div>

            {activeTab === 'profile' && (
                <div className={styles.profileSection}>
                    <div className={styles.avatarSection}>
                        <div className={styles.avatar}>{user.name ? user.name[0] : 'U'}</div>
                        <p>{user.email}</p>
                    </div>

                    <div className={styles.profileGrid}>
                        <div className={styles.formCol}>
                            <h3>Personal Details</h3>
                            <div className={styles.inputGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    style={{ background: '#f5f5f5' }}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Phone</label>
                                <input
                                    type="text"
                                    placeholder="+91..."
                                    value={profile.phone}
                                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                                />
                            </div>
                            <button className={styles.saveBtn} onClick={handleSaveProfile}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className={styles.ordersSection}>
                    {orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 40, color: '#666' }}>No orders found.</div>
                    ) : (
                        orders.map((order: any) => (
                            <div key={order._id} className={styles.trackingCard} style={{ marginBottom: 40 }}>
                                <div className={styles.trackingHeader}>
                                    <h2>Order {order.orderId}</h2>
                                    <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>

                                <div className={styles.orderDetailsGrid}>
                                    <div className={styles.col}>
                                        <span className={styles.label}>Order Details</span>
                                        <div className={styles.kv}><span>Status: {order.status}</span></div>
                                        <div className={styles.kv}><span>Total Items: {order.items.length}</span></div>
                                    </div>
                                    <div className={styles.col}>
                                        <span className={styles.label}>Ship To</span>
                                        <p>{order.shippingInfo?.fullName}<br />{order.shippingInfo?.address}<br />{order.shippingInfo?.city}, {order.shippingInfo?.postalCode}</p>
                                    </div>
                                    <div className={styles.col}>
                                        <span className={styles.label}>Payment</span>
                                        <div className={styles.summaryRow}><span>Total</span><span>${order.amount.toFixed(2)}</span></div>
                                    </div>
                                </div>

                                {/* Timeline Visual (Simplified based on status) */}
                                <div className={styles.trackTimeline} style={{ marginTop: 20 }}>
                                    <div className={styles.timelineVisual}>
                                        <div className={styles.trackLine} />
                                        <div className={`${styles.trackStep} ${styles.done}`}>
                                            <div className={styles.trackDot} />
                                            <span>Confirmed</span>
                                        </div>
                                        <div className={`${styles.trackStep} ${['shipped', 'delivered'].includes(order.status) ? styles.done : (order.status === 'processing' ? styles.active : '')}`}>
                                            <div className={styles.trackDot} />
                                            <span>Processing</span>
                                        </div>
                                        <div className={`${styles.trackStep} ${['delivered'].includes(order.status) ? styles.done : (order.status === 'shipped' ? styles.active : '')}`}>
                                            <div className={styles.trackDot} />
                                            <span>Shipped</span>
                                        </div>
                                        <div className={`${styles.trackStep} ${order.status === 'delivered' ? styles.done : ''}`}>
                                            <div className={styles.trackDot} />
                                            <span>Delivered</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Product List */}
                                <div className={styles.productList}>
                                    {order.items.map((item: any, i: number) => (
                                        <div key={i} className={styles.prodRow}>
                                            <div className={styles.prodMain}>
                                                {item.image && <img src={item.image} alt={item.name} />}
                                                <div className={styles.prodDetails}>
                                                    <h4>{item.name}</h4>
                                                    <span>Size : {item.size || 'N/A'}</span>
                                                    <span>Qty : {item.quantity}</span>
                                                </div>
                                            </div>
                                            <div className={styles.prodPrice}>${item.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default AccountPage;
