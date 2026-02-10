"use client";

import React from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import styles from './wishlist.module.css';

const WishlistPage = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const moveToCart = (item: any) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
            size: 'M', // Default size, user can change in cart
            color: 'Default'
        });
        removeFromWishlist(item.id);
        showToast(`${item.name} moved to cart!`, 'success');
    };

    if (wishlist.length === 0) {
        return (
            <div className={`container ${styles.emptyWishlist}`}>
                <Heart size={64} strokeWidth={1} />
                <h1>Your wishlist is empty</h1>
                <p>Save items you love to buy later.</p>
                <Link href="/products" className={styles.shopBtn}>Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className={`container ${styles.wishlistPage}`}>
            <Link href="/products" className={styles.backLink}><ArrowLeft size={18} /> Continue Shopping</Link>

            <div className={styles.header}>
                <h1>My Wishlist</h1>
                <span>{wishlist.length} items</span>
            </div>

            <div className={styles.grid}>
                {wishlist.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <Link href={`/product/${item.id}`} className={styles.imageWrapper}>
                            <img src={item.image} alt={item.name} />
                        </Link>
                        <button
                            className={styles.removeBtn}
                            onClick={() => removeFromWishlist(item.id)}
                            aria-label="Remove from wishlist"
                        >
                            <Trash2 size={16} />
                        </button>

                        <div className={styles.info}>
                            <Link href={`/product/${item.id}`} className={styles.name}>{item.name}</Link>
                            <div className={styles.priceBlock}>
                                <span className={styles.price}>₹{item.price.toLocaleString()}</span>
                                {item.originalPrice && item.originalPrice > item.price && (
                                    <span className={styles.mrp}>₹{item.originalPrice.toLocaleString()}</span>
                                )}
                            </div>

                            <button className={styles.moveToCartBtn} onClick={() => moveToCart(item)}>
                                <ShoppingBag size={16} /> Move to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
