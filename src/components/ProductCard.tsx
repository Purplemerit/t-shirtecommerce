"use client";

import React from 'react';
import Link from 'next/link';
import { Star, ArrowUpRight } from 'lucide-react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    rating?: number;
    category?: string;
    originalPrice?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, rating, category, originalPrice }) => {
    return (
        <div className={styles.card}>
            <Link href={`/product/${id}`} className={styles.imageWrapper}>
                <img src={image || '/images/Rectangle 2.png'} alt={name} className={styles.image} />
                <div className={styles.hoverOverlay}>
                    <ArrowUpRight size={32} color="white" />
                </div>
            </Link>

            <div className={styles.info}>
                <div className={styles.mainInfo}>
                    <Link href={`/product/${id}`}>
                        <h3 className={styles.name}>{name}</h3>
                    </Link>
                    <span className={styles.price}>₹{price?.toLocaleString()}</span>
                </div>
                <Link href={`/product/${id}`} className={styles.viewBtn}>View</Link>
            </div>
        </div>
    );
};

export default ProductCard;
