"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function CollectionDetailPage() {
    const params = useParams();
    const [collection, setCollection] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!params.id) return;

        const fetchCollection = async () => {
            try {
                // Ensure dynamic path matches API
                const res = await fetch(`/api/collections/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setCollection(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollection();
    }, [params.id]);

    if (loading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={32} />
            </div>
        );
    }

    if (!collection) {
        return <div style={{ textAlign: 'center', padding: 40 }}>Collection not found</div>;
    }

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>{collection.title}</h1>
                {collection.description && (
                    <p style={{ maxWidth: 600, margin: '0 auto', color: '#666', fontSize: 16, lineHeight: 1.6 }}>
                        {collection.description}
                    </p>
                )}
            </div>

            {(!collection.products || collection.products.length === 0) ? (
                <div style={{ textAlign: 'center', color: '#999', padding: 60, background: '#f9f9f9', borderRadius: 8 }}>
                    No products in this collection yet.
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 30 }}>
                    {collection.products.map((product: any) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            price={product.price}
                            image={product.images?.[0] || 'https://via.placeholder.com/300'}
                            rating={product.rating}
                            category={product.category}
                            originalPrice={product.mrp}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
