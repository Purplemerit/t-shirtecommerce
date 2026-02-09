"use client";

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import styles from './PromoModal.module.css';

const PromoModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after 3 seconds
        const timer = setTimeout(() => {
            const hasSeen = localStorage.getItem('faxico-promo-seen');
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('faxico-promo-seen', 'true');
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className={styles.promoContent}>
                <div className={styles.imageBlock}>
                    <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" alt="Promo" />
                </div>
                <div className={styles.textBlock}>
                    <span className={styles.badge}>LIMITED OFFER</span>
                    <h2>Unlock 15% Off Your First Order</h2>
                    <p>Join our community and be the first to know about new collections and exclusive offers.</p>
                    <form className={styles.form} onSubmit={e => { e.preventDefault(); handleClose(); }}>
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Subscribe Now</button>
                    </form>
                    <button className={styles.noThanks} onClick={handleClose}>No thanks, I'll pay full price</button>
                </div>
            </div>
        </Modal>
    );
};

export default PromoModal;
