"use client";

import React, { useState } from 'react';
import styles from './legal.module.css';

const PrivacyPage = () => {
    const [activeSection, setActiveSection] = useState('intro');

    const scrollTo = (id: string) => {
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className={`container ${styles.legalPage}`}>
            <h1 className={styles.mainTitle}>Privacy Policy</h1>
            <p className={styles.subtitle}>Please read our privacy policy carefully before using our services.</p>

            <div className={styles.heroImage}>
                <img
                    src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=1200"
                    alt="Privacy Policy Hero"
                    style={{ objectPosition: 'center 20%' }}
                />
            </div>

            <div className={styles.contentLayout}>
                <aside className={styles.sidebar}>
                    <h3>Contents</h3>
                    <nav>
                        <button className={activeSection === 'intro' ? styles.active : ''} onClick={() => scrollTo('intro')}>Introduction</button>
                        <button className={activeSection === 'collection' ? styles.active : ''} onClick={() => scrollTo('collection')}>Data Collection</button>
                        <button className={activeSection === 'use' ? styles.active : ''} onClick={() => scrollTo('use')}>Use of Data</button>
                        <button className={activeSection === 'security' ? styles.active : ''} onClick={() => scrollTo('security')}>Security</button>
                        <button className={activeSection === 'cookies' ? styles.active : ''} onClick={() => scrollTo('cookies')}>Cookies</button>
                    </nav>
                </aside>

                <div className={styles.mainContent}>
                    <section id="intro">
                        <h2>Introduction</h2>
                        <p>Welcome to Faxico's Privacy Policy. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                    </section>

                    <section id="collection">
                        <h2>Data Collection</h2>
                        <p>We collect various types of information in connection with the services we provide, including:</p>
                        <ul>
                            <li><strong>Identity Data</strong> includes first name, maiden name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Financial Data</strong> includes bank account and payment card details.</li>
                            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                        </ul>
                    </section>

                    <section id="use">
                        <h2>Use of Data</h2>
                        <p>We use your data to provide our services effectively. This includes handling your orders, processing payments, and delivering your products. We may also use your data to communicate with you about your account or transactions.</p>
                        <p>We do not sell your personal data to third parties.</p>
                    </section>

                    <section id="security">
                        <h2>Security</h2>
                        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
                    </section>

                    <section id="cookies">
                        <h2>Cookies</h2>
                        <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                    </section>

                    <div className={styles.contactRef}>
                        <h3>Contact Information</h3>
                        <div className={styles.contactBox}>
                            <p><strong>Question?</strong></p>
                            <p>Email us at: privacy@faxico.com</p>
                            <a href="/chat">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
