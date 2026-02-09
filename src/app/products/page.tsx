"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, Filter, X, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import styles from './products.module.css';

const ProductsPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = selectedCategory
                    ? `/api/products?category=${encodeURIComponent(selectedCategory)}`
                    : '/api/products';
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    const filters = [
        { title: 'Category', options: ['T-Shirts', 'Shoes', 'Jackets', 'Shorts'] },
        { title: 'Gender', options: ['Men', 'Women'] },
        { title: 'Price', options: ['Below Rs. 500', 'Rs. 500-1000', 'Rs. 1001-1500', 'Rs. 1501-2000'] },
    ];

    return (
        <div className={styles.productsPage}>
            <div className="container">
                <div className={styles.header}>
                    <div className={styles.breadcrumbs}>
                        <span>Home</span> / <span>Shop</span> / <span className={styles.active}>All Products</span>
                    </div>
                    <h1>Products - {products.length} items</h1>
                </div>

                <div className={styles.mainLayout}>
                    {/* Sidebar */}
                    <aside className={`${styles.sidebar} ${isFilterOpen ? styles.open : ''}`}>
                        <div className={styles.filterHeader}>
                            <h3>FILTER</h3>
                            <button className={styles.closeBtn} onClick={() => setIsFilterOpen(false)}><X /></button>
                        </div>

                        {filters.map((filter, i) => (
                            <div key={i} className={styles.filterGroup}>
                                <h4>{filter.title} <ChevronDown size={14} /></h4>
                                <div className={styles.options}>
                                    {filter.options.map(opt => (
                                        <label key={opt} className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCategory === opt}
                                                onChange={() => setSelectedCategory(selectedCategory === opt ? null : opt)}
                                            />
                                            <span>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </aside>

                    {/* Grid Area */}
                    <div className={styles.gridArea}>
                        <div className={styles.toolbar}>
                            <div className={styles.sort}>
                                <span>Sort by:</span>
                                <button>Recommended <ChevronDown size={14} /></button>
                            </div>
                            <button className={styles.mobileFilterBtn} onClick={() => setIsFilterOpen(true)}>
                                <Filter size={18} /> Filters
                            </button>
                        </div>

                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                                <Loader2 className="animate-spin" size={32} />
                            </div>
                        ) : products.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: 60, color: '#666' }}>
                                No products found.
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {products.map(p => (
                                    <ProductCard
                                        key={p._id}
                                        id={p._id}
                                        name={p.name}
                                        price={p.price}
                                        originalPrice={p.mrp}
                                        image={p.images?.[0] || 'https://via.placeholder.com/300'}
                                        rating={p.rating}
                                        category={p.category}
                                    />
                                ))}
                            </div>
                        )}

                        <div className={styles.pagination}>
                            <button className={styles.viewMore}>View More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
