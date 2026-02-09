"use client";

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './cart.module.css';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    if (cart.length === 0) {
        return (
            <div className={`container ${styles.emptyCart}`}>
                <h1>Your bag is empty</h1>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link href="/products" className={styles.shopBtn}>Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className={`container ${styles.cartPage}`}>
            <Link href="/products" className={styles.backLink}><ArrowLeft size={18} /> Continue Shopping</Link>

            <div className={styles.layout}>
                <div className={styles.itemsBlock}>
                    <div className={styles.header}>
                        <h1>Your Bag</h1>
                        <span>{totalItems} items</span>
                    </div>

                    <div className={styles.itemList}>
                        {cart.map((item, i) => (
                            <div key={`${item.id}-${i}`} className={styles.item}>
                                <div className={styles.itemImage}>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className={styles.itemInfo}>
                                    <div className={styles.itemTop}>
                                        <h3>{item.name}</h3>
                                        <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}><Trash2 size={18} /></button>
                                    </div>
                                    <p className={styles.itemDetail}>Size: {item.size} | Color: {item.color}</p>
                                    <div className={styles.itemBottom}>
                                        <div className={styles.qtyControl}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                                        </div>
                                        <span className={styles.itemPrice}>${item.price * item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className={styles.summary}>
                    <h3>Order Summary</h3>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>${totalPrice}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Taxes</span>
                        <span>Included</span>
                    </div>
                    <div className={styles.totalRow}>
                        <span>Total</span>
                        <span>${totalPrice}</span>
                    </div>
                    <Link href="/checkout" className={styles.checkoutBtn}>Checkout Now</Link>

                    <div className={styles.offers}>
                        <h4>Available Offers</h4>
                        <div className={styles.offerCard}>
                            <p>Get 10% OFF on your first purchase. Use code: <strong>WELCOME10</strong></p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CartPage;
