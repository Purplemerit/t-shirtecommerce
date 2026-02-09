"use client";

import React from 'react';
import styles from './about.module.css';

const AboutPage = () => {
    return (
        <div className={styles.about}>
            {/* Hero */}
            {/* Hero */}
            <section className={styles.hero}>
                <div className={`container ${styles.heroContainer}`}>
                    <div className={styles.heroBanner}>
                        <img src="https://images.unsplash.com/photo-1541258672048-8df0c345b14c?q=80&w=2000&auto=format&fit=crop" alt="Our Story" />
                        <div className={styles.heroOverlay}>
                            <div className={styles.heroText}>
                                <span className={styles.heroTitleLight}>Our Story</span>
                                <span className={styles.heroTitleBold}>Since 2026</span>
                            </div>
                            <div className={styles.glassCard}>
                                <p>Redefining modern elegance through sustainable practices and timeless design.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey */}
            <section className={styles.journey}>
                <div className={`container ${styles.journeyGrid}`}>
                    <div className={styles.journeyText}>
                        <h2>Our Journey From Sketch to Closet</h2>
                        <p>Founded in 2024, Fexco started with a simple question: Why can't fashion be both beautiful and responsible? What began as a small studio in London has grown into a global movement, proving that style and sustainability aren't mutually exclusive.</p>
                        <p>Every piece we create is a testament to our commitment from the first sketch to the final stitch. We've built relationships with ethical manufacturers, invested in innovative materials, and created a supply chain we're proud to stand behind.</p>

                        <div className={styles.stats}>
                            <div><h3>2024</h3><p>Founded</p></div>
                            <div><h3>15+</h3><p>Countries</p></div>
                            <div><h3>50k+</h3><p>Customers</p></div>
                        </div>
                    </div>
                    <div className={styles.journeyImages}>
                        <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800" alt="Draft" />
                        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" alt="Process" />
                    </div>
                </div>
            </section>

            {/* Materials */}
            <section className={styles.materials}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <h2 className="center">Materials That Matters</h2>
                        <p className="center">Every fiber tells a story. We carefully select materials that honor both people and planet.</p>
                    </div>

                    <div className={styles.materialGrid}>
                        <div className={styles.materialCard}>
                            <img src="https://images.unsplash.com/photo-1594145071427-41400d98638b?auto=format&fit=crop&q=80&w=600" alt="Organic Cotton" />
                            <h3>Organic Cotton</h3>
                            <p>GOTS-certified organic cotton grown without harmful pesticides. Softer, stronger, and better for farmers and soil health.</p>
                        </div>
                        <div className={styles.materialCard}>
                            <img src="https://images.unsplash.com/photo-1529139574466-a301f6d4b5bb?auto=format&fit=crop&q=80&w=600" alt="Recycled Polyester" />
                            <h3>Recycled Polyester</h3>
                            <p>Made from post-consumer plastic bottles. Durable, moisture-wicking, and diverts waste from landfills and oceans.</p>
                        </div>
                        <div className={styles.materialCard}>
                            <img src="https://images.unsplash.com/photo-1560769129-d67bc097bc54?auto=format&fit=crop&q=80&w=600" alt="Lyocell" />
                            <h3>Tencel™ Lyocell</h3>
                            <p>Sustainably sourced from eucalyptus trees. Silky smooth, breathable, and produced in a closed-loop process that recycles.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className={styles.missionVision}>
                <div className={`container ${styles.mvGrid}`}>
                    <div className={styles.mvCard}>
                        <span className={styles.tag}>OUR MISSION</span>
                        <h2>To prove that fashion can be both beautiful and responsible</h2>
                        <p>We exist to challenge the status quo of fast fashion. Every garment we create is a statement that style doesn't require compromise—not on quality, not on ethics, not on the planet's future. We're building a new standard where elegance and sustainability are inseparable.</p>
                        <div className={styles.mvButtons}>
                            <button>Zero Waste Goal by 2030</button>
                            <button>Zero Waste Goal by 2030</button>
                        </div>
                    </div>
                    <div className={styles.mvImage}>
                        <img src="https://images.unsplash.com/photo-1520006403993-479601d933e4?auto=format&fit=crop&q=80&w=800" alt="Mission" />
                    </div>
                </div>

                <div className={`container ${styles.mvGrid} ${styles.reverse}`}>
                    <div className={styles.mvImage}>
                        <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=800" alt="Vision" />
                    </div>
                    <div className={styles.mvCard}>
                        <span className={styles.tag}>OUR VISION</span>
                        <h2>A world where every wardrobe tells a story of conscious choices</h2>
                        <div className={styles.visionList}>
                            <div>
                                <h4>Industry Leadership</h4>
                                <p>Set the benchmark for sustainable practices that others aspire to follow.</p>
                            </div>
                            <div>
                                <h4>Global Impact</h4>
                                <p>Expand our reach to empower conscious consumers worldwide.</p>
                            </div>
                            <div>
                                <h4>Circular Economy</h4>
                                <p>Pioneer take-back programs and closed-loop manufacturing systems.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pillars */}
            <section className={styles.pillars}>
                <div className="container">
                    <h2>Four Pillars Driving Our Future</h2>
                    <div className={styles.pillarGrid}>
                        {[
                            { id: '01', title: 'Planet First', text: 'Minimize environmental impact through regenerative practices, carbon-neutral operations, and circular design principles. Our goal: net-positive impact by 2030.' },
                            { id: '02', title: 'People Powered', text: 'Champion fair labor practices, invest in artisan communities, and create opportunities for growth. Every person in our supply chain deserves dignity and fair compensation.' },
                            { id: '03', title: 'Quality Obsessed', text: 'Craft products that last decades, not seasons. Through rigorous testing, premium materials, and meticulous craftsmanship, we create pieces worthy of heirloom status.' },
                            { id: '04', title: 'Radically Transparent', text: 'Share our journey openly—the wins, the challenges, and the lessons learned. Full supply chain visibility and honest communication build trust and accountability.' }
                        ].map(pillar => (
                            <div key={pillar.id} className={styles.pillarCard}>
                                <div className={styles.pillarId}>{pillar.id}</div>
                                <h3>{pillar.title}</h3>
                                <p>{pillar.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <div className="container center">
                    <h2>Ready to redefine your style?</h2>
                    <p>Join thousands of others who have made the switch to sustainable, high-quality fashion.</p>
                    <div className={styles.ctaButtons}>
                        <button className={styles.primaryBtn}>Shop Collection</button>
                        <button className={styles.secondaryBtn}>Read Our Journal</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
