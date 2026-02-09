"use client";

import React from 'react';
import styles from './Marquee.module.css';

const Marquee = () => {
    const items = ["Kids", "Faxico", "Ladies", "Boys", "Men"];
    const repeatedItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];

    return (
        <div className={styles.marqueeContainer}>
            <div className={styles.scroll}>
                {repeatedItems.map((item, i) => (
                    <React.Fragment key={i}>
                        <span className={styles.item}>{item}</span>
                        <span className={styles.heart}>❤️</span>
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.scroll}>
                {repeatedItems.map((item, i) => (
                    <React.Fragment key={i}>
                        <span className={styles.item}>{item}</span>
                        <span className={styles.heart}>❤️</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
