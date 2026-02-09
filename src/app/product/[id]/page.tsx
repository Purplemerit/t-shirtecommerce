"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, Heart, ShoppingBag, ChevronRight, ChevronLeft, Check, Truck, RotateCcw, ShieldCheck, Shirt, Wind, Droplet, Ruler, Loader2, Gift, Plus, Minus, Share2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import styles from './product.module.css';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

const ProductDetail = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('details');

    // Standard Product State
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Gift Card State
    const [selectedDenomination, setSelectedDenomination] = useState<number | null>(null);

    const [recommendations, setRecommendations] = useState<any[]>([]);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { user } = useAuth();

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                    // Set defaults
                    if (data.isGiftCard && data.denominations?.length > 0) {
                        setSelectedDenomination(data.denominations[0]);
                    } else {
                        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Fetch recommendations when product is loaded
    useEffect(() => {
        if (!product) return;

        const fetchRecommendations = async () => {
            try {
                const res = await fetch('/api/recommendations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        category: product.category,
                        tags: product.tags
                    })
                });
                const data = await res.json();
                if (data.success && data.recommendations.length > 0) {
                    setRecommendations(data.recommendations);
                }
            } catch (error) {
                console.error("Failed to load recommendations", error);
            }
        };

        fetchRecommendations();
    }, [product]);

    if (loading) {
        return <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" size={32} /></div>;
    }

    if (!product) {
        return <div style={{ textAlign: 'center', padding: 40 }}>Product not found</div>;
    }

    const handleAddToCart = (redirect = false) => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (product.isGiftCard) {
            if (!selectedDenomination) {
                alert('Please select a value');
                return;
            }
            addToCart({
                id: product._id,
                name: `${product.name} - ₹${selectedDenomination}`,
                price: selectedDenomination,
                image: product.images?.[0] || '',
                quantity: quantity,
                size: 'N/A',
                color: 'N/A'
            });
            if (redirect) router.push('/checkout');
            else alert('Gift card added to cart!');
            return;
        }

        if (product.sizes?.length > 0 && !selectedSize) {
            alert('Please select a size');
            return;
        }

        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || '',
            quantity: quantity,
            size: selectedSize || 'One Size',
            color: product.colors?.[selectedColor] || 'Default'
        });

        if (redirect) {
            router.push('/checkout');
        } else {
            alert('Added to cart!');
        }
    };

    const handleWishlist = () => {
        if (!user) {
            router.push('/login');
            return;
        }
        toggleWishlist(product);
    };

    return (
        <div className={styles.productPage}>
            {/* Header / Breadcrumbs */}
            <div className="container">
                <div className={styles.topNav}>
                    <button className={styles.backBtn} onClick={() => window.history.back()}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <div className={styles.breadcrumbs}>
                        <span>Home</span> <ChevronRight size={14} />
                        <span>{product.category || 'Shop'}</span> <ChevronRight size={14} />
                        <span className={styles.activeCrumb}>{product.name}</span>
                    </div>
                </div>

                <div className={styles.mainContainer}>
                    {/* Gallery Section */}
                    <div className={styles.gallerySection}>
                        <div className={styles.mainImageContainer}>
                            <div className={styles.badgeRow}>
                                {product.mrp > product.price && (
                                    <span className={styles.discountBadgeTop}>
                                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
                                    </span>
                                )}
                            </div>
                            <img src={product.images?.[0] || '/images/Rectangle 2.png'} alt={product.name} className={styles.mainImage} />

                            <button className={styles.navBtnPrev}><ChevronLeft size={24} /></button>
                            <button className={styles.navBtnNext}><ChevronRight size={24} /></button>
                        </div>
                        <div className={styles.thumbnailList}>
                            {product.images?.map((img: string, i: number) => (
                                <div key={i} className={`${styles.thumbItem} ${i === 0 ? styles.activeThumb : ''}`}>
                                    <img src={img} alt={`Thumbnail ${i}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className={styles.productInfo}>
                        <h1 className={styles.productTitle}>{product.name}</h1>

                        <div className={styles.statsRow}>
                            <div className={styles.ratingStars}>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} size={16} fill={i <= (product.rating || 4) ? "gold" : "none"} stroke={i <= (product.rating || 4) ? "gold" : "#ccc"} />
                                ))}
                                <span className={styles.ratingValue}>{product.rating || "4.5"}</span>
                            </div>
                        </div>

                        <p className={styles.shortDesc}>
                            {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                        </p>

                        {/* Color Selector */}
                        {product.colors?.length > 0 && (
                            <div className={styles.infoSection}>
                                <label className={styles.sectionLabel}>Colours</label>
                                <div className={styles.colorOptions}>
                                    {product.colors.map((c: string, i: number) => (
                                        <button
                                            key={i}
                                            className={`${styles.colorCircle} ${selectedColor === i ? styles.activeColor : ''}`}
                                            style={{ backgroundColor: c }}
                                            onClick={() => setSelectedColor(i)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selector */}
                        {product.sizes?.length > 0 && (
                            <div className={styles.infoSection}>
                                <label className={styles.sectionLabel}>Size</label>
                                <div className={styles.sizeOptions}>
                                    {product.sizes.map((s: string) => (
                                        <button
                                            key={s}
                                            className={`${styles.sizeBtn} ${selectedSize === s ? styles.activeSize : ''}`}
                                            onClick={() => setSelectedSize(s)}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Pricing */}
                        <div className={styles.priceContainer}>
                            <span className={styles.priceBig}>₹{product.price?.toLocaleString()}</span>
                            {product.mrp > product.price && (
                                <>
                                    <span className={styles.mrpSmall}>₹{product.mrp?.toLocaleString()}</span>
                                    <span className={styles.percentOff}>({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF)</span>
                                </>
                            )}
                        </div>

                        {/* Trust Badges */}
                        <div className={styles.trustRow}>
                            <div className={styles.trustItem}><Check size={16} /> Hassle Free 7 Days Return</div>
                            <div className={styles.trustItem}><Check size={16} /> 100% money back guarantee</div>
                            <div className={styles.trustItem}><Check size={16} /> 100% original quality Assurance</div>
                            <div className={styles.trustItem}><Check size={16} /> Dispatch ready order, will be within 24h</div>
                        </div>

                        {/* Main Actions */}
                        <div className={styles.mainActions}>
                            <button className={styles.secondaryAction} onClick={handleWishlist}>
                                <Heart size={20} fill={isInWishlist(product._id) ? "black" : "none"} /> Add to Wishlist
                            </button>
                            <button className={styles.secondaryAction} onClick={() => handleAddToCart(false)}>
                                <ShoppingBag size={20} /> Add to Cart
                            </button>
                        </div>
                        <button className={styles.buyNowFull} onClick={() => handleAddToCart(true)}>Buy Now</button>
                    </div>
                </div>

                {/* Info Tabs / Accordions */}
                <div className={styles.tabSection}>
                    <div className={styles.tabHeader} onClick={() => setActiveTab(activeTab === 'details' ? '' : 'details')}>
                        Product Details <span className={styles.plusIcon}>{activeTab === 'details' ? '-' : '+'}</span>
                    </div>
                    {activeTab === 'details' && (
                        <div className={styles.tabContent}>
                            <div className={styles.specsGrid}>
                                <div className={styles.specItem}><span>Department:</span> {product.tags?.includes('women') ? 'Women' : 'Men'}</div>
                                <div className={styles.specItem}><span>Category:</span> {product.category}</div>
                                <div className={styles.specItem}><span>Manufacturer:</span> Faxico Brands</div>
                                <div className={styles.specItem}><span>Country of Origin:</span> India</div>
                            </div>
                        </div>
                    )}

                    <div className={styles.tabHeader} onClick={() => setActiveTab(activeTab === 'size' ? '' : 'size')}>
                        Size Chart <span className={styles.plusIcon}>{activeTab === 'size' ? '-' : '+'}</span>
                    </div>
                    {activeTab === 'size' && (
                        <div className={styles.tabContent}>
                            <p>This size chart is tailored for all Faxico products. To ensure the perfect fit, please refer to the detailed measurements provided in the chart above.</p>
                        </div>
                    )}
                </div>

                {/* Similar Products */}
                <section className={styles.relatedSection}>
                    <h2 className={styles.secTitle}>Similar Products</h2>
                    <div className={styles.horizontalScroll}>
                        {recommendations.slice(0, 6).map(p => (
                            <ProductCard key={p._id} {...p} id={p._id} image={p.images?.[0]} />
                        ))}
                    </div>
                </section>

                {/* Advanced Info Sections matching "Magic Behind comfort" design */}
                <div className={styles.magicSection}>
                    <h1>The Magic Behind The Comfort</h1>
                    <p>Every Faxico product is crafted with meticulous attention to detail, combining sustainable materials with cutting-edge textile technology.</p>

                    <div className={styles.magicGrid}>
                        <div className={styles.magicCard}>
                            <div className={styles.magicIcon}><ShieldCheck /></div>
                            <h3>Durability and Longevity</h3>
                            <p>Engineered to withstand wear and tear, ensuring a longer lifespan for everyday use.</p>
                        </div>
                        <div className={styles.magicCenterImg}>
                            <img src="/images/Rectangle 5.png" alt="Fabric" />
                        </div>
                        <div className={styles.magicCard}>
                            <div className={styles.magicIcon}><Droplet /></div>
                            <h3>Eco-Friendly Fabrics</h3>
                            <p>Utilize sustainable materials like organic cotton and bamboo, reducing environmental impact.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.sizeSection}>
                    <div className={styles.sizeHeader}>
                        <h1>MEN'S CLOTHING SIZE CHART</h1>
                    </div>
                    <div className={styles.sizeLayout}>
                        <div className={styles.sizeDiagram}>
                            <img src="/images/Rectangle 23.png" alt="Size Diagram" />
                        </div>
                        <div className={styles.sizeTableContainer}>
                            <table className={styles.sizeTable}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>S</th>
                                        <th>M</th>
                                        <th>L</th>
                                        <th>XXL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>CHEST</td>
                                        <td>34"</td>
                                        <td>38"</td>
                                        <td>42"</td>
                                        <td>50"</td>
                                    </tr>
                                    <tr>
                                        <td>WAIST</td>
                                        <td>28"</td>
                                        <td>32"</td>
                                        <td>36"</td>
                                        <td>44"</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className={styles.ecoBanner}>
                    <img src="/images/Rectangle 5 copy.png" alt="Eco" className={styles.ecoBg} />
                    <div className={styles.ecoOverlay}>
                        <h2>Eco-Friendly Fashion<br />Made with Sustainable Cotton</h2>
                        <p>We source only the finest, eco-conscious materials, ensuring a luxurious feel and a commitment to environmental stewardship.</p>
                        <Link href="/products" className={styles.buyNowFull} style={{ width: 'fit-content' }}>Shop Collection</Link>
                    </div>
                </div>

                <section className={styles.reviewsSection}>
                    <div className={styles.revHeader}>
                        <h2>Reviews</h2>
                        <button className={styles.secondaryAction} onClick={() => alert('Review submission coming soon!')}>Write a Review</button>
                    </div>
                    <div className={styles.revGrid}>
                        <div className={styles.revCard}>
                            <div className={styles.starsSmall}>
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="gold" stroke="gold" />)}
                            </div>
                            <p>"Absolutely amazing quality. The fabric feels premium and the fit is perfect. Highly recommend Faxico!"</p>
                            <div className={styles.revAuthor}>
                                <img src="/images/Rectangle 6.png" alt="Anjali" />
                                <span>Anjali R.</span>
                            </div>
                        </div>
                        <div className={styles.revCard}>
                            <div className={styles.starsSmall}>
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="gold" stroke="gold" />)}
                            </div>
                            <p>"The block print saree is even more beautiful in person. The colors are so vibrant and it's very comfortable to wear."</p>
                            <div className={styles.revAuthor}>
                                <img src="/images/Rectangle 2 copy.png" alt="Riya" />
                                <span>Riya S.</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetail;
