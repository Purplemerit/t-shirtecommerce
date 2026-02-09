"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
                login(data.user.email, data.user.role);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.container}>
                {/* Left Side: Image */}
                <div className={styles.imageSection}>
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
                            <p>Log in to your Account</p>
                        </div>

                        {error && <div className={styles.error}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="hello@example.com"
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
                                        placeholder="********"
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
                                    <span>Remember me</span>
                                </label>
                                <a href="/forgot-password" className={styles.forgot}>
                                    Forget Password ?
                                </a>
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                                {isLoading ? 'Logging In...' : 'Login'}
                            </button>

                            <div className={styles.divider}>
                                <span>or continue with</span>
                            </div>

                            <div className={styles.socialBtns}>
                                <button type="button" className={styles.socialBtn}>
                                    <img src="https://www.google.com/favicon.ico" alt="Google" width={20} />
                                    Signup with Google
                                </button>
                                <button type="button" className={styles.socialBtn}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" width={16} />
                                    Sign up with Apple
                                </button>
                            </div>

                            <p className={styles.switchAuth}>
                                Don't have an account yet ? <Link href="/signup">Create Account</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
