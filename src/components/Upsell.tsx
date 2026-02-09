"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle, Star } from 'lucide-react';
import styles from './Upsell.module.css';

interface UpsellProps {
    onComplete: () => void;
}

const Upsell = ({ onComplete }: UpsellProps) => {
    const [timeLeft, setTimeLeft] = useState({ m: 4, s: 41 });
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.s === 0) {
                    if (prev.m === 0) return prev;
                    return { m: prev.m - 1, s: 59 };
                }
                return { ...prev, s: prev.s - 1 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const product = {
        name: 'Nike Air Max 90 Premium',
        originalPrice: 170.00,
        price: 144.50,
        taxes: 7.23,
        rating: 4,
        reviews: 2,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200", // Placeholder for thumbs
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200"
        ]
    };

    const handleAddOrder = () => {
        alert("Added to order!");
        onComplete();
    };

    return (
        <div className={`container ${styles.upsellContainer}`}>
            <div className={styles.successHeader}>
                <CheckCircle size={20} />
                <span>You have paid for your order</span>
                <span className={styles.viewOrderLink} onClick={onComplete}>View your order confirmation &gt;</span>
            </div>

            <div className={styles.mainContent}>
                <h1 className={styles.title}>Jane, it's not too late to get more! Grab another for 15% OFF!</h1>

                <div className={styles.greenBanner}>
                    Offer expires in: 0{timeLeft.m}:{timeLeft.s < 10 ? `0${timeLeft.s}` : timeLeft.s}
                </div>

                <div className={styles.splitLayout}>
                    {/* Left: Images */}
                    <div className={styles.imageSection}>
                        <div className={styles.mainImage}>
                            <img src={product.images[0]} alt={product.name} />
                        </div>
                        <div className={styles.thumbnails}>
                            <button className={styles.navBtn}>&lt;</button>
                            {product.images.slice(1).map((img, i) => (
                                <img key={i} src={img} alt="thumb" className={styles.thumb} />
                            ))}
                            <button className={styles.navBtn}>&gt;</button>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className={styles.detailsSection}>
                        <h2 className={styles.productName}>{product.name}</h2>

                        <div className={styles.priceBlock}>
                            <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                            <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
                            <span className={styles.saveTag}>(Save 15%)</span>
                        </div>

                        <div className={styles.ratingRow}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < product.rating ? "#f1c40f" : "#e0e0e0"} stroke="none" />
                            ))}
                            <span className={styles.reviewCount}>({product.reviews})</span>
                        </div>

                        <p className={styles.urgencyText}>Don't miss out on this offer...it expires after you leave this page!</p>

                        <div className={styles.quantitySection}>
                            <label>Quantity</label>
                            <div className={styles.qtyControl}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>

                        <div className={styles.costBreakdown}>
                            <div className={styles.row}>
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className={styles.row}>
                                <span>Taxes</span>
                                <span>${product.taxes}</span>
                            </div>
                        </div>

                        <button className={styles.addToOrderBtn} onClick={handleAddOrder}>
                            Add to order - ${(product.price * quantity + product.taxes).toFixed(2)} USD
                        </button>

                        <button className={styles.declineBtn} onClick={onComplete}>
                            Decline this offer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upsell;
