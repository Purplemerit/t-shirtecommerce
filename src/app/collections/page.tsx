"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './collections.module.css';

interface Collection {
    _id: string;
    title: string;
    description: string;
    image: string;
    products: any[];
}

export default function CollectionsPage() {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await fetch('/api/admin/collections');
                if (res.ok) {
                    const data = await res.json();
                    setCollections(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, []);

    if (loading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={32} />
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 40, textAlign: 'center' }}>Collections</h1>

            {collections.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#666' }}>No collections found.</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 30 }}>
                    {collections.map(collection => (
                        <Link href={`/collections/${collection._id}`} key={collection._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className={styles.collectionCard}>
                                <div className={styles.imageWrapper}>
                                    {collection.image ? (
                                        <img src={collection.image} alt={collection.title} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className={styles.info}>
                                    <h2 style={{ fontSize: 18, fontWeight: 600, margin: '10px 0 5px' }}>{collection.title}</h2>
                                    <p style={{ fontSize: 14, color: '#666', margin: 0 }}>{collection.products?.length || 0} products</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
