"use client";

import React, { useState } from 'react';
import styles from './legal.module.css';

const TermsPage = () => {
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
            <h1 className={styles.mainTitle}>Terms & Conditions</h1>
            <p className={styles.subtitle}>Please read our terms and conditions carefully before using our services.</p>

            <div className={styles.heroImage}>
                <img
                    src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=1200"
                    alt="Terms Hero"
                />
            </div>

            <div className={styles.contentLayout}>
                <aside className={styles.sidebar}>
                    <h3>Contents</h3>
                    <nav>
                        <button className={activeSection === 'intro' ? styles.active : ''} onClick={() => scrollTo('intro')}>Introduction</button>
                        <button className={activeSection === 'use' ? styles.active : ''} onClick={() => scrollTo('use')}>Use of Terms</button>
                        <button className={activeSection === 'account' ? styles.active : ''} onClick={() => scrollTo('account')}>User Account</button>
                        <button className={activeSection === 'intellectual' ? styles.active : ''} onClick={() => scrollTo('intellectual')}>Intellectual Property</button>
                        <button className={activeSection === 'privacy' ? styles.active : ''} onClick={() => scrollTo('privacy')}>Privacy</button>
                        <button className={activeSection === 'limitation' ? styles.active : ''} onClick={() => scrollTo('limitation')}>Limitation of Liability</button>
                    </nav>
                </aside>

                <div className={styles.mainContent}>
                    <section id="intro">
                        <h2>Introduction</h2>
                        <p>Welcome to Faxico. These detailed terms and conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms. If you do not agree with any part of these terms, you must not use our services.</p>
                        <p>We provide a wide range of fashion products and accessories. These terms apply to all visitors, users, and others who access or use the Service.</p>
                    </section>

                    <section id="use">
                        <h2>Use of Terms</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Faxico's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
                        <p>Under this license, you may not modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</p>
                    </section>

                    <section id="account">
                        <h2>User Account</h2>
                        <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
                        <p>You are responsible for safeguarding usage of your account and for any activities or actions under your account and password.</p>
                    </section>

                    <section id="intellectual">
                        <h2>Intellectual Property</h2>
                        <p>The Service and its original content, features and functionality are and will remain the exclusive property of Faxico and its licensors. The Service is protected by copyright, trademark, and other laws of both the India and foreign countries.</p>
                    </section>

                    <section id="privacy">
                        <h2>Privacy</h2>
                        <p>Your privacy is important to us. It is Faxico's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate. We only ask for personal information when we truly need it to provide a service to you.</p>
                    </section>

                    <section id="limitation">
                        <h2>Limitation of Liability</h2>
                        <p>In no event shall Faxico, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service.</p>
                    </section>

                    <div className={styles.contactRef}>
                        <h3>Contact Information</h3>
                        <div className={styles.contactBox}>
                            <p><strong>Question?</strong></p>
                            <p>Email us at: hello@faxico.com</p>
                            <a href="/chat">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
