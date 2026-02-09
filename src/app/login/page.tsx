"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './login.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams?.get('redirect') || undefined;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                login(data.user.email, data.user.role, redirect);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert(`${provider} Login is simulated for this demo. Redirecting...`);
            login('demo@google.com', 'customer', redirect);
        }, 1500);
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.container}>
                {/* Left Side: Image */}
                <div className={styles.imageSection}>
                    <div className={styles.imageOverlay}>
                        <h2>Premium Designs<br />Exclusively For You.</h2>
                        <p>Join over 350k+ customers worldwide.</p>
                    </div>
                    <img
                        src="/images/Frame 16.png"
                        alt="Fashion Model"
                    />
                </div>

                {/* Right Side: Form */}
                <div className={styles.formSection}>
                    <div className={styles.formContent}>
                        <div className={styles.header}>
                            <h1>Log In</h1>
                            <p>Enter your details to access your account</p>
                        </div>

                        {error && <div className={styles.error}>{error}</div>}

                        <form onSubmit={handleSubmit}>
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

                            <div className={styles.actions}>
                                <label className={styles.checkbox}>
                                    <input type="checkbox" />
                                    <span>Keep me logged in</span>
                                </label>
                                <a href="/forgot-password" className={styles.forgot}>
                                    Forgot Password?
                                </a>
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Sign In'}
                            </button>

                            <div className={styles.divider}>
                                <span>OR</span>
                            </div>

                            <div className={styles.socialBtns}>
                                <button type="button" className={styles.socialBtn} onClick={() => handleSocialLogin('Google')}>
                                    <img src="https://www.google.com/favicon.ico" alt="Google" width={18} />
                                    Sign in with Google
                                </button>
                            </div>

                            <div className={styles.signupBox}>
                                <p>Don't have an account yet?</p>
                                <button
                                    type="button"
                                    className={styles.secondaryBtn}
                                    onClick={() => router.push(redirect ? `/signup?redirect=${redirect}` : '/signup')}
                                >
                                    Create New Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
