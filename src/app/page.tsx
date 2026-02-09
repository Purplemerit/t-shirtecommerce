"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight, Plus, Star, ShieldCheck, Heart, Share2, Minus } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/admin/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const elegantProduct1 = products.find(p => p.name.includes("Saree")) || products[0];
  const elegantProduct2 = products.find(p => p.name.includes("Polo")) || products[1];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBanner}>
              <img src="/images/Rectangle 1.png" alt="Hero Banner" className={styles.heroImage} />
            </div>

            <div className={styles.heroMain}>
              <div className={styles.heroLeft}>
                <h1 className="slide-up">Capture Your<br />Defining Moments</h1>

                <div className={styles.heroCard}>
                  <div className={styles.heroCardImg}>
                    <img src={elegantProduct1?.images?.[0] || "/images/Rectangle 2.png"} alt="Hero Card" />
                    <div className={styles.heroCardBadge}>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <div className={styles.heroCardMeta}>
                    <Link href={elegantProduct1 ? `/product/${elegantProduct1._id || elegantProduct1.id}` : "/products"} className={styles.learnMore}>Learn More <ChevronRight size={18} /></Link>
                    <span className={styles.discount}>(36%)</span>
                  </div>
                </div>
              </div>

              <div className={styles.heroRight}>
                <div className={styles.verticalImg}>
                  <img src="/images/Frame 2121453300.png" alt="Featured" />
                  <div className={styles.cornerIcon}>
                    <Star size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Section */}
      <section className={styles.sustainable}>
        <div className={styles.sustainHeader}>
          <h2>Sustainable, High-<br />Quality Fashion</h2>
          <div className={styles.sustainArrows}>
            <Link href="/products" className={styles.whiteBtn}><ArrowUpRight size={24} /></Link>
            <Link href="/about" className={styles.whiteBtn}><ArrowUpRight size={24} /></Link>
          </div>
        </div>

        <div className={styles.sustainGrid}>
          <div className={styles.sustainMainImg}>
            <img src="/images/Rectangle 5 copy 5.png" alt="Sustain" />
          </div>
          <div className={styles.sustainCard}>
            <div className={styles.iconBox}><Plus size={20} /></div>
            <p>We use only the finest materials to ensure every piece is durable, comfortable, & made to last.</p>
          </div>
          <div className={styles.sustainCard}>
            <div className={styles.iconBox}><Plus size={20} /></div>
            <p>We use only the finest materials to ensure every piece is durable, comfortable, & made to last.</p>
          </div>
        </div>
      </section>

      {/* Elegant Products Section */}
      <section className={styles.elegant}>
        <div className="container">
          <div className={styles.elegantTitle}>
            <h2>Fashion based in<br />UK Elegant Products</h2>
          </div>

          <div className={styles.elegantContent}>
            <div className={styles.elegantLeft}>
              <div className={styles.sideProduct}>
                <div className={styles.sideProdImg}>
                  <img src={elegantProduct1?.images?.[0] || "/images/Rectangle 2 copy.png"} alt="Product" />
                </div>
                <div className={styles.sideProdInfo}>
                  <div className={styles.prodDetails}>
                    <strong>{elegantProduct1?.name || "Product Name"}</strong>
                    <span>₹{elegantProduct1?.price?.toLocaleString() || "Price"}</span>
                  </div>
                  <Link href={`/product/${elegantProduct1?._id || elegantProduct1?.id}`} className={styles.viewBtn}>View</Link>
                </div>
              </div>
            </div>

            <div className={styles.elegantCenter}>
              <div className={styles.starburst}>
                <svg viewBox="0 0 100 100" className={styles.spinningSvg}>
                  <path d="M50 0 L58 35 L95 25 L75 50 L95 75 L58 65 L50 100 L42 65 L5 75 L25 50 L5 25 L42 35 Z" fill="black" />
                </svg>
              </div>
            </div>

            <div className={styles.elegantRight}>
              <div className={styles.sideProduct}>
                <div className={styles.sideProdImg}>
                  <img src={elegantProduct2?.images?.[0] || "/images/Rectangle 4 copy 2.png"} alt="Product" />
                </div>
                <div className={styles.sideProdInfo}>
                  <div className={styles.prodDetails}>
                    <strong>{elegantProduct2?.name || "Product Name"}</strong>
                    <span>₹{elegantProduct2?.price?.toLocaleString() || "Price"}</span>
                  </div>
                  <Link href={`/product/${elegantProduct2?._id || elegantProduct2?.id}`} className={styles.viewBtn}>View</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories List */}
      <section className={styles.catSection}>
        <div className="container">
          <div className={styles.catGrid}>
            <div className={styles.catLeft}>
              {[
                { name: 'Jackets', count: 378, id: 'jacket' },
                { name: 'T-shirt', count: 120, id: 't-shirt' },
                { name: 'Shorts', count: 240, id: 'shorts' },
                { name: 'Outer', count: 480, id: 'outerwear' }
              ].map((cat, i) => (
                <Link href={`/products?category=${cat.id}`} key={i} className={styles.catItem}>
                  <span>{cat.name} ({cat.count})</span>
                  <ArrowUpRight size={16} className={styles.catArrow} />
                </Link>
              ))}
            </div>
            <div className={styles.catRight}>
              <img src="/images/Rectangle 5.png" alt="Category" />
              <div className={styles.catPlus}><Star size={24} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Stats Row */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsLayout}>
            <div className={styles.testimonialBlock}>
              <span className={styles.testLabel}>(Testimonial)</span>
              <div className={styles.testTop}>
                <img src="/images/Rectangle 6.png" alt="Author" />
                <p>Finally a brand that understands modern elegance! the quality is amazing & always get when i wear my faxico</p>
              </div>
              <div className={styles.testAuthor}>
                <strong>Deniel Spokes</strong>
                <span>Fashion director</span>
              </div>
            </div>
            <div className={styles.statLine}>
              <div className={styles.statItem}>
                <h3>450+</h3>
                <span>Collections</span>
              </div>
              <div className={styles.statItem}>
                <h3>350K</h3>
                <span>Customer worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqContent}>
            <div className={styles.faqTitleBlock}>
              <h2>Asked a Question</h2>
              <div className={styles.helpBox}>
                <h3>Help & Support</h3>
                <p>Step into a new era of fashion with our cutting-edge styles and sophisticated designs.</p>
                <Link href="/chat" style={{ fontWeight: 'bold', borderBottom: '1px solid currentColor', width: 'fit-content' }}>Book a Call &gt;</Link>
              </div>
            </div>
            <div className={styles.faqRight}>
              <p className={styles.faqIntro}>Step into a new era of fashion with our cutting-edge styles and sophisticated designs.</p>
              <div className={styles.faqList}>
                {[
                  "How do I create an account?",
                  "What is your return policy?",
                  "Do you offer international shipping?",
                  "How can I track my order?",
                  "Is there a physical store I can visit?"
                ].map((q, i) => (
                  <div key={i} className={styles.faqRow} onClick={() => toggleFaq(i)} style={{ cursor: 'pointer', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span className={styles.faqN}>0{i + 1}</span>
                        <p style={{ margin: 0 }}>{q}</p>
                      </div>
                      {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                    {openFaq === i && (
                      <p style={{ paddingLeft: '3rem', color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        Here is the detailed answer to "{q}". This content is static for demonstration purposes, but it shows the interactivity works.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer is handled by layout.tsx */}
    </div>
  );
}
