"use client";

import React from 'react';
import Link from 'next/link';
import { Twitter, Instagram, Facebook, Linkedin, ArrowUpRight, Heart, Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

const Footer = () => {
    const pathname = usePathname();

    if (pathname === '/login' || pathname === '/signup' || pathname?.startsWith('/admin')) return null;

    return (
        <footer className={styles.footer}>
            {/* Newsletter Section */}
            <div className={styles.newsletterSection}>
                <div className="container">
                    <div className={styles.newsContent}>
                        <h2>Join the community & get 15% OFF</h2>
                        <div className={styles.emailBox}>
                            <input type="email" placeholder="Email Address..." />
                        </div>
                    </div>

                    <div className={styles.footerMain}>
                        <div className={styles.leftBrand}>
                            <div className={styles.logoRow}>
                                <Heart size={20} fill="#ff4d00" stroke="#ff4d00" />
                                <span className={styles.logoText}>Faxico</span>
                            </div>
                        </div>

                        <div className={styles.linksGrid}>
                            <div className={styles.linkGroup}>
                                <h4>Home</h4>
                                <Link href="/products?category=men">Men</Link>
                                <Link href="/products?category=women">Women</Link>
                                <Link href="/products?category=children">Kids</Link>
                            </div>
                            <div className={styles.linkGroup}>
                                <h4>Know about us</h4>
                                <Link href="/about">About us</Link>
                                <Link href="/terms">Terms & Conditions</Link>
                                <Link href="/privacy">Privacy policy</Link>
                            </div>
                            <div className={styles.linkGroup}>
                                <h4>Help Center</h4>
                                <Link href="/faq">Faq</Link>
                                <Link href="/support">Support</Link>
                                <Link href="/feedback">Feedback</Link>
                            </div>
                            <div className={styles.linkGroup}>
                                <h4>Contact us</h4>
                                <div className={styles.socialIcons}>
                                    <Link href="#"><Share2 size={20} /></Link>
                                    <Link href="#"><Heart size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <p className={styles.copyright}>@2026 Faxico. All Right Reserved</p>
                    </div>

                    <h1 className={styles.hugeWatermark}>Faxico</h1>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
