"use client";

import React, { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';
import styles from './faq.module.css';

const FaqPage = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "How do I place an order?",
            answer: "You can browse our products, select your size and color, and click 'Add to Cart'. When you're ready, proceed to checkout where you can enter your shipping details and payment information."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, Mastercard), UPI, Net Banking, and Wallet payments via our secure payment gateway."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive a tracking number via email. You can also view your order status in the 'Your Orders' section of your account."
        },
        {
            question: "What is your return policy?",
            answer: "We have a hassle-free 7-day return policy. If you fit issues or defects, you can initiate a return from your account dashboard."
        },
        {
            question: "Do you ship internationally?",
            answer: "Currently, we ship to all locations within the country. International shipping options will be available soon."
        }
    ];

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={`container ${styles.faqPage}`}>
            <h1 className={styles.title}>Frequently Asked Questions</h1>
            <p className={styles.subtitle}>Find answers to common questions about our products and services.</p>

            <div className={styles.searchBox}>
                <Search className={styles.searchIcon} size={20} />
                <input type="text" placeholder="Search for a question..." />
            </div>

            <div className={styles.faqList}>
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                        onClick={() => toggleFaq(index)}
                    >
                        <div className={styles.questionHeader}>
                            <h3>{faq.question}</h3>
                            <button className={styles.toggleBtn}>
                                {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                            </button>
                        </div>
                        <div className={styles.answer}>
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.supportBox}>
                <h3>Still have questions?</h3>
                <p>Can't find the answer you're looking for? Please seek support from our team.</p>
                <a href="/support" className={styles.contactBtn}>Contact Support</a>
            </div>
        </div>
    );
};

export default FaqPage;
