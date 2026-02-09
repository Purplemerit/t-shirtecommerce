"use client";

import React from 'react';
import { Mail, MessageCircle, MapPin, Phone } from 'lucide-react';
import styles from './support.module.css';

const SupportPage = () => {
    return (
        <div className={`container ${styles.supportPage}`}>
            <h1 className={styles.title}>Contact Support</h1>
            <p className={styles.subtitle}>We're here to help. Reach out to us via any of the channels below.</p>

            <div className={styles.grid}>
                {/* Contact Form */}
                <div className={styles.formSection}>
                    <h2>Send us a message</h2>
                    <form className={styles.form}>
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label>First Name</label>
                                <input type="text" placeholder="John" />
                            </div>
                            <div className={styles.group}>
                                <label>Last Name</label>
                                <input type="text" placeholder="Doe" />
                            </div>
                        </div>
                        <div className={styles.group}>
                            <label>Email</label>
                            <input type="email" placeholder="john@example.com" />
                        </div>
                        <div className={styles.group}>
                            <label>Subject</label>
                            <select>
                                <option>Order Issue</option>
                                <option>Product Question</option>
                                <option>Return / Refund</option>
                                <option>Feedback</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className={styles.group}>
                            <label>Message</label>
                            <textarea rows={5} placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="submit" className={styles.submitBtn}>Send Message</button>
                    </form>
                </div>

                {/* Info Section */}
                <div className={styles.infoSection}>
                    <div className={styles.infoCard}>
                        <Mail className={styles.icon} size={24} />
                        <h3>Email Us</h3>
                        <p>Our friendly team is here to help.</p>
                        <a href="mailto:support@faxico.com">support@faxico.com</a>
                    </div>

                    <div className={styles.infoCard}>
                        <MessageCircle className={styles.icon} size={24} />
                        <h3>Live Chat</h3>
                        <p>Mon-Fri from 8am to 5pm.</p>
                        <a href="/chat">Start a chat</a>
                    </div>

                    <div className={styles.infoCard}>
                        <MapPin className={styles.icon} size={24} />
                        <h3>Visit Us</h3>
                        <p>Come say hello at our office HQ.</p>
                        <span>123 Fashion Street, Design City, 110001</span>
                    </div>

                    <div className={styles.infoCard}>
                        <Phone className={styles.icon} size={24} />
                        <h3>Call Us</h3>
                        <p>Mon-Fri from 8am to 5pm.</p>
                        <span>+91 98765 43210</span>
                    </div>
                </div>
            </div>

            <div id="feedback" className={styles.feedbackSection}>
                <h2>We value your feedback</h2>
                <p>Have suggestions on how we can improve? Let us know!</p>
                {/* Reuse contact form logic or separate endpoint, visually simplified here */}
            </div>
        </div>
    );
};

export default SupportPage;
