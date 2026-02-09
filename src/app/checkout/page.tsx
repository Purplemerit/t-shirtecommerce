"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './checkout.module.css';
import Upsell from '@/components/Upsell';
import { CheckCircle, CreditCard, Banknote, QrCode, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);
    const [showUpsell, setShowUpsell] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push('/login?redirect=/checkout');
        }
    }, [user, router]);

    // 2: Address, 3: Payment
    const [step, setStep] = useState(2);
    const [paymentMethod, setPaymentMethod] = useState('card');

    // Shipping Address State
    const [shippingInfo, setShippingInfo] = useState({
        email: user?.email || '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        postalCode: '',
        country: 'India',
        phone: ''
    });

    // Discount State
    const [discountCode, setDiscountCode] = useState('');
    const [discountError, setDiscountError] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState<{ code: string, amount: number } | null>(null);

    const finalTotal = appliedDiscount ? Math.max(0, totalPrice - appliedDiscount.amount) : totalPrice;

    const handleApplyDiscount = async () => {
        if (!discountCode) return;
        setDiscountError('');
        try {
            const res = await fetch('/api/discounts/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: discountCode, cartTotal: totalPrice })
            });
            const data = await res.json();
            if (res.ok) {
                setAppliedDiscount({ code: data.code, amount: data.discountAmount });
                setDiscountCode('');
            } else {
                setDiscountError(data.error);
                setAppliedDiscount(null);
            }
        } catch (error) {
            setDiscountError('Failed to validate discount');
        }
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        const res = await loadRazorpay();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            setIsProcessing(false);
            return;
        }

        // Create Order with shipping info
        const orderRes = await fetch('/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: finalTotal,
                items: cart.map(item => ({
                    productId: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    size: item.size,
                    image: item.image
                })),
                userEmail: user?.email,
                shippingInfo: {
                    fullName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
                    email: shippingInfo.email,
                    address: shippingInfo.address,
                    apartment: shippingInfo.apartment,
                    city: shippingInfo.city,
                    postalCode: shippingInfo.postalCode,
                    country: shippingInfo.country,
                    phone: shippingInfo.phone
                },
                discountCode: appliedDiscount?.code
            }),
        });
        const orderData = await orderRes.json();

        if (orderData.error) {
            alert('Server error. Please try again.');
            setIsProcessing(false);
            return;
        }

        // Open Razorpay
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: orderData.amount,
            currency: orderData.currency,
            name: "Faxico Fashion",
            description: "Transaction for your order",
            order_id: orderData.id,
            handler: async function (response: any) {
                // Verify payment on server
                try {
                    const verifyRes = await fetch('/api/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        setShowUpsell(true);
                        clearCart();
                    } else {
                        alert('Payment verification failed. Please contact support.');
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    alert('Payment verification failed. Please contact support.');
                }
                setIsProcessing(false);
            },
            prefill: {
                name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
                email: shippingInfo.email,
                contact: shippingInfo.phone || "9999999999",
            },
            theme: {
                color: "#000000",
            },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
    };

    const handleUpsellComplete = () => {
        setShowUpsell(false);
        setIsSuccess(true);
    };

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.email ||
            !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.phone) {
            alert('Please fill in all required fields');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(shippingInfo.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Validate phone (basic check)
        if (shippingInfo.phone.length < 10) {
            alert('Please enter a valid phone number');
            return;
        }

        setStep(3);
    };

    if (showUpsell) {
        return <Upsell onComplete={handleUpsellComplete} />;
    }

    if (isSuccess) {
        return (
            <div className={`container ${styles.success}`}>
                <h1>Order Placed Successfully!</h1>
                <p>Thank you for shopping with Faxico. Your order #FX-{Math.floor(Math.random() * 90000) + 10000} has been confirmed.</p>
                <button onClick={() => window.location.href = '/account'}>View Order</button>
            </div>
        );
    }

    return (
        <div className={styles.checkoutPage}>
            {/* Red Alert Banner */}
            <div className={styles.alertBanner}>
                Hurry up! Your cart is reserved for 09:59s
            </div>

            <div className="container">
                <div className={styles.breadcrumb}>
                    &lt; {step === 2 ? 'Go to shopping cart' : 'Go to address form'}
                </div>

                {/* Timeline */}
                <div className={styles.timeline}>
                    <div className={`${styles.step} ${styles.completed}`}>
                        <div className={styles.stepIcon}><CheckCircle size={16} /></div>
                        <span>Shopping Cart</span>
                    </div>
                    <div className={`${styles.connector} ${styles.activeConnector}`}></div>
                    <div className={`${styles.step} ${step >= 2 ? styles.active : ''} ${step > 2 ? styles.completed : ''}`}>
                        <div className={styles.stepIcon}>{step > 2 ? <CheckCircle size={16} /> : <div className={styles.dot} />}</div>
                        <span>Address</span>
                    </div>
                    <div className={`${styles.connector} ${step >= 3 ? styles.activeConnector : ''}`}></div>
                    <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
                        <div className={styles.stepIcon}><div className={styles.dot} /></div>
                        <span>Payment Info</span>
                    </div>
                </div>

                <div className={styles.layout}>
                    {/* Left Column */}
                    <div className={styles.mainColumn}>
                        {step === 2 && (
                            <form onSubmit={handleAddressSubmit} className={styles.addressForm}>
                                <h3>Contact Information</h3>
                                <div className={styles.inputGroup}>
                                    <input
                                        type="email"
                                        placeholder="Email*"
                                        value={shippingInfo.email}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                        className={styles.input}
                                        required
                                    />
                                </div>
                                <div className={styles.checkboxGroup}>
                                    <input type="checkbox" id="news" />
                                    <label htmlFor="news">Email me with news and offers</label>
                                </div>

                                <h3 style={{ marginTop: '2rem' }}>Shipping address</h3>
                                <div className={styles.formGrid}>
                                    <div className={styles.inputGroupFull}>
                                        <select
                                            className={styles.input}
                                            value={shippingInfo.country}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                                            required
                                        >
                                            <option value="India">India</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">UK</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <input
                                            type="text"
                                            placeholder="First Name*"
                                            value={shippingInfo.firstName}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <input
                                            type="text"
                                            placeholder="Last name*"
                                            value={shippingInfo.lastName}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputGroupFull}>
                                        <input
                                            type="text"
                                            placeholder="Address*"
                                            value={shippingInfo.address}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputGroupFull}>
                                        <input
                                            type="text"
                                            placeholder="Apartment, suite, etc. (optional)"
                                            value={shippingInfo.apartment}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, apartment: e.target.value })}
                                            className={styles.input}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <input
                                            type="text"
                                            placeholder="City*"
                                            value={shippingInfo.city}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <input
                                            type="text"
                                            placeholder="Pincode*"
                                            value={shippingInfo.postalCode}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputGroupFull}>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number*"
                                            value={shippingInfo.phone}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <button type="button" className={styles.saveDefaultBtn}>Save as default address</button>
                                    <button type="submit" className={styles.continueBtn}>Continue</button>
                                </div>
                            </form>
                        )}

                        {step === 3 && (
                            <div className={styles.paymentSection}>
                                <div className={styles.paymentOptions}>
                                    <div
                                        className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.selected : ''}`}
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <span className={styles.iconWrapper}><CreditCard size={20} /></span>
                                        <div className={styles.optionText}>
                                            <span className={styles.optionTitle}>Credit Card / Debit Card / Net Banking</span>
                                        </div>
                                    </div>

                                    <div
                                        className={`${styles.paymentOption} ${paymentMethod === 'upi' ? styles.selected : ''}`}
                                        onClick={() => setPaymentMethod('upi')}
                                    >
                                        <span className={styles.iconWrapper}><QrCode size={20} /></span>
                                        <div className={styles.optionText}>
                                            <span className={styles.optionTitle}>UPI / Dynamic QR code</span>
                                        </div>
                                    </div>

                                    <div
                                        className={`${styles.paymentOption} ${paymentMethod === 'emi' ? styles.selected : ''}`}
                                        onClick={() => setPaymentMethod('emi')}
                                    >
                                        <span className={styles.iconWrapper}><Banknote size={20} /></span>
                                        <div className={styles.optionText}>
                                            <span className={styles.optionTitle}>EMI / No cost EMI / Cardless EMI</span>
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.paymentOption} ${paymentMethod === 'cod' ? styles.selected : ''}`}
                                        onClick={() => setPaymentMethod('cod')}
                                    >
                                        <span className={styles.iconWrapper}><Truck size={20} /></span>
                                        <div className={styles.optionText}>
                                            <span className={styles.optionTitle}>Pay on Delivery</span>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={handlePlaceOrder} className={styles.payBtn}>
                                    {isProcessing ? 'Processing... ' : 'Pay Securely Now'}
                                </button>

                                <div className={styles.secureBadge}>
                                    <span className={styles.lockIcon}>🔒</span> Secure Payments. 100% secure payments to provide you with a simple and safe experience.
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Summary */}
                    <aside className={styles.orderSummary}>
                        <div className={styles.itemList}>
                            {cart.map(item => (
                                <div key={item.id} className={styles.orderItem}>
                                    <div className={styles.imgWrapper}>
                                        <img src={item.image} alt={item.name} />
                                        <span className={styles.qtyBadge}>{item.quantity}</span>
                                    </div>
                                    <div className={styles.orderItemInfo}>
                                        <p>{item.name}</p>
                                        <span>Size: {item.size}</span>
                                    </div>
                                    <strong>₹{item.price * item.quantity}</strong>
                                </div>
                            ))}
                        </div>

                        <div className={styles.upsellBrief}>
                            <h4>You may also like</h4>
                            <div className={styles.briefItem}>
                                <img src="/images/Frame 15 copy.png" alt="Upsell Product" />
                                <div className={styles.briefInfo}>
                                    <p>Product added to the cart</p>
                                    <span>₹240.00</span>
                                </div>
                                <button className={styles.briefAdd}>Add</button>
                            </div>
                        </div>

                        <div className={styles.totals}>
                            <div className={styles.row}><span>Subtotal</span><span>₹{totalPrice}</span></div>
                            <div className={styles.row}><span>Shipping</span><span>{step === 3 ? 'Calculated at next step' : 'Free'}</span></div>
                            <div className={styles.totalRow}><span>Total</span><span>₹{finalTotal}</span></div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
