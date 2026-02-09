"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { Users, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EmptyCustomerIcon = () => (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="60" fill="#F1F2F3" />
        <circle cx="70" cy="55" r="15" fill="#E5E7EB" />
        <path d="M50 90C50 78.9543 58.9543 70 70 70C81.0457 70 90 78.9543 90 90V95H50V90Z" fill="#E5E7EB" />
    </svg>
);

interface Customer {
    _id: string;
    name: string;
    email: string;
    address: { city: string; country: string } | null;
    createdAt: string;
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchCustomers = async () => {
        try {
            const res = await fetch('/api/admin/customers');
            if (res.ok) {
                const data = await res.json();
                setCustomers(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

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
                <div className={styles.pageTitle}>Customers</div>
                <button
                    className={styles.primaryButton}
                    onClick={() => router.push('/admin/customers/new')}
                >
                    Add customer
                </button>
            </div>

            {customers.length === 0 ? (
                <div className={styles.emptyStateContainer}>
                    <div style={{ marginBottom: 20 }}>
                        <EmptyCustomerIcon />
                    </div>
                    <h2 className={styles.emptyStateTitle}>Your customers will show here</h2>
                    <p className={styles.emptyStateDescription}>
                        Manage customer details and view their purchase history.
                    </p>
                    <button
                        className={styles.primaryButton}
                        onClick={() => router.push('/admin/customers/new')}
                    >
                        Add customer
                    </button>
                </div>
            ) : (
                <div className={styles.ordersSection} style={{ backgroundColor: 'white', border: '1px solid #e1e3e5', borderRadius: 8, overflow: 'hidden' }}>
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ background: '#f9fafb' }}>
                                <th style={{ width: 40 }}><input type="checkbox" /></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Location</th>
                                <th>Orders</th>
                                <th>Amount spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => (
                                <tr key={customer._id}>
                                    <td><input type="checkbox" /></td>
                                    <td style={{ fontWeight: 600 }}>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.address?.city || 'Unknown'}, {customer.address?.country || ''}</td>
                                    <td>0 orders</td>
                                    <td>$0.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
