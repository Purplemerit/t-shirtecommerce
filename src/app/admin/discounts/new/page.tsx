"use client";
import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function CreateDiscountPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [code, setCode] = useState('');
    const [type, setType] = useState('percentage');
    const [value, setValue] = useState(10);
    const [appliesTo, setAppliesTo] = useState('all');

    const generateCode = () => {
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        setCode(random);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/admin/discounts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: code.toUpperCase(),
                    type,
                    value: parseFloat(value.toString()),
                    appliesTo,
                    status: 'active'
                })
            });

            if (res.ok) {
                router.push('/admin/discounts');
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to create discount');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to connect to server');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 50 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 12 }}>
                    <ArrowLeft size={20} color="#5c5f62" />
                </button>
                <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Create discount</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Amount / Type */}
                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Amount off products</h3>
                        <button type="button" onClick={generateCode} style={{ fontSize: 13, color: '#0078d4', background: 'none', border: 'none', cursor: 'pointer' }}>Generate code</button>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Discount code</label>
                        <input
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            placeholder="e.g. SUMMER24"
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, textTransform: 'uppercase' }}
                        />
                        <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Customers will enter this code at checkout.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            >
                                <option value="percentage">Percentage</option>
                                <option value="fixed_amount">Fixed amount</option>
                                <option value="free_shipping">Free shipping</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Value</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    required
                                    value={value}
                                    onChange={(e) => setValue(parseFloat(e.target.value))}
                                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                                />
                                <span style={{ position: 'absolute', right: 12, top: 10, color: '#666', fontSize: 13 }}>
                                    {type === 'percentage' ? '%' : 'INR'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applies to */}
                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e1e3e5' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Applies to</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="appliesTo"
                                checked={appliesTo === 'all'}
                                onChange={() => setAppliesTo('all')}
                            />
                            <span>Entire order</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="appliesTo"
                                checked={appliesTo === 'specific_products'}
                                onChange={() => setAppliesTo('specific_products')}
                            />
                            <span>Specific products</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="appliesTo"
                                checked={appliesTo === 'collections'}
                                onChange={() => setAppliesTo('collections')}
                            />
                            <span>Specific collections</span>
                        </label>
                        {appliesTo !== 'all' && (
                            <p style={{ marginTop: 8, fontSize: 13, color: '#d97706', background: '#fffbeb', padding: 8, borderRadius: 4 }}>
                                Note: Specific targeting logic will be implemented in future update. Currently applies to all.
                            </p>
                        )}
                    </div>
                </div>

                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                    <button type="button" onClick={() => router.back()} className={styles.actionBtn}>Discard</button>
                    <button type="submit" disabled={submitting} className={styles.primaryButton} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {submitting && <Loader2 className="animate-spin" size={16} />}
                        Save discount
                    </button>
                </div>
            </form>
        </div>
    );
}
