"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from '../login/login.module.css';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Determine user role (defaults to customer)
                login(data.user.email, (data.user.role as 'admin' | 'customer') || 'customer');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialSignup = (provider: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert(`${provider} Signup is simulated for this demo.`);
            login('newuser@google.com', 'customer');
        }, 1500);
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.container}>
                {/* Left Side: Image */}
                <div className={styles.imageSection}>
                    <div className={styles.imageOverlay}>
                        <h2>Exclusive Access<br />Starts Here.</h2>
                        <p>Create an account to track your orders in real-time.</p>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                        alt="Fashion Model in Yellow"
                    />
                </div>

                {/* Right Side: Form */}
                <div className={styles.formSection}>
                    <div className={styles.formContent}>
                        <div className={styles.header}>
                            <h1>Create Account</h1>
                            <p>Join the Faxico community today</p>
                        </div>

                        {error && <div className={styles.error}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="hello@faxico.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Password</label>
                                <div className={styles.passwordWrapper}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className={styles.eyeBtn}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* RE-ADDED Confirm Password Field */}
                            <div className={styles.inputGroup}>
                                <label>Confirm Password</label>
                                <div className={styles.passwordWrapper}>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className={styles.eyeBtn}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={isLoading} style={{ marginTop: '1rem' }}>
                                {isLoading ? 'Creating Account...' : 'Continue to Shop'}
                            </button>

                            <div className={styles.divider}>
                                <span>OR</span>
                            </div>

                            <div className={styles.socialBtns}>
                                <button type="button" className={styles.socialBtn} onClick={() => handleSocialSignup('Google')}>
                                    <img src="https://www.google.com/favicon.ico" alt="Google" width={18} />
                                    Signup with Google
                                </button>
                            </div>

                            <div className={styles.signupBox}>
                                <p>Already have an account?</p>
                                <button
                                    type="button"
                                    className={styles.secondaryBtn}
                                    onClick={() => router.push('/login')}
                                >
                                    Log In Instead
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
