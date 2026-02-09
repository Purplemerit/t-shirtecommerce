"use client";

import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link'; // Import Link
import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>Shopping Cart ({cart.length})</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <div className={styles.items}>
                    {cart.length === 0 ? (
                        <div className={styles.empty}>
                            <ShoppingBag size={48} opacity={0.2} />
                            <p>Your cart is empty</p>
                            <button onClick={onClose} className={styles.continueBtn}>Continue Shopping</button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={`${item.id}-${item.size}-${item.color}`} className={styles.cartItem}>
                                <div className={styles.itemImg}>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className={styles.itemInfo}>
                                    <div className={styles.itemTop}>
                                        <h4>{item.name}</h4>
                                        <button onClick={() => removeFromCart(item.id)}><X size={16} /></button>
                                    </div>
                                    <p className={styles.variant}>{item.size} / {item.color}</p>
                                    <div className={styles.itemBottom}>
                                        <div className={styles.qtyControl}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                                        </div>
                                        <span className={styles.price}>Rs. {item.price * item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.total}>
                            <span>Subtotal</span>
                            <span>Rs. {totalPrice}</span>
                        </div>
                        <p className={styles.taxNote}>Shipping and taxes calculated at checkout.</p>
                        <Link href="/checkout" onClick={onClose} className={styles.checkoutBtn}>
                            Checkout
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
