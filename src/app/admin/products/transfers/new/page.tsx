"use client";
import React, { useState } from 'react';
import styles from '@/app/admin/admin.module.css';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Grid, Search, X } from 'lucide-react';

export default function CreateTransferPage() {
    const router = useRouter();
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [reference, setReference] = useState('');
    const [tags, setTags] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/admin/transfers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    origin,
                    destination,
                    dateCreated: date,
                    referenceName: reference,
                    tags: tags.split(',').map(s => s.trim()).filter(Boolean),
                    notes
                })
            });

            if (res.ok) {
                router.push('/admin/products');
            } else {
                alert('Failed to create transfer');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: 50 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                        <ArrowLeft size={20} color="#5c5f62" />
                    </button>
                    <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Create transfer</h1>
                    <span style={{ background: '#ffd6a4', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500 }}>Unsaved changes</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className={styles.actionBtn} onClick={() => router.back()}>Discard</button>
                    <button className={styles.primaryButton} onClick={handleSubmit}>Save</button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 20 }}>
                {/* Main Column */}
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* Origin/Destination Card */}
                    <div style={{ background: 'white', border: '1px solid #e1e3e5', borderRadius: 8, padding: 20 }}>
                        <div style={{ display: 'flex', gap: 16 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 4, fontWeight: 500, fontSize: 14 }}>Origin</label>
                                <select
                                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                >
                                    <option value="">Select origin</option>
                                    <option value="Warehouse A">Warehouse A</option>
                                    <option value="Store Location">Store Location</option>
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 4, fontWeight: 500, fontSize: 14 }}>Destination</label>
                                <select
                                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                >
                                    <option value="">Select destination</option>
                                    <option value="Warehouse A">Warehouse A</option>
                                    <option value="Store Location">Store Location</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Add Products Card */}
                    <div style={{ background: 'white', border: '1px solid #e1e3e5', borderRadius: 8, padding: 20, minHeight: 300 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Add products</h3>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <Search size={16} style={{ position: 'absolute', left: 10, top: 10, color: '#999' }} />
                                <input
                                    placeholder="Search products"
                                    style={{ width: '100%', padding: '8px 12px 8px 36px', border: '1px solid #ccc', borderRadius: 4 }}
                                />
                            </div>
                            <button className={styles.actionBtn}>Browse</button>
                            <button className={styles.actionBtn}>Import</button>
                            <button className={styles.actionBtn} style={{ padding: 8 }}><Grid size={18} /></button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* Notes */}
                    <div style={{ background: 'white', border: '1px solid #e1e3e5', borderRadius: 8, padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Notes</h3>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0078d4' }}>Edit</button>
                        </div>
                        <textarea
                            placeholder="No notes"
                            rows={2} // initial
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            style={{ width: '100%', border: 'none', resize: 'none', fontSize: 14, color: '#666' }}
                        />
                    </div>

                    {/* Transfer Details */}
                    <div style={{ background: 'white', border: '1px solid #e1e3e5', borderRadius: 8, padding: 20 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Transfer details</h3>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', marginBottom: 4, fontWeight: 500, fontSize: 14 }}>Date created</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 4, fontWeight: 500, fontSize: 14 }}>Reference name</label>
                            <input
                                placeholder="Enter reference name"
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div style={{ background: 'white', border: '1px solid #e1e3e5', borderRadius: 8, padding: 20 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Tags</h3>
                        <input
                            placeholder="Add tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
                        />
                        <div style={{ textAlign: 'right', fontSize: 12, color: '#999', marginTop: 4 }}>0/40</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
