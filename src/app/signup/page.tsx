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
                // Determine user role (defaults to user usually)
                login(data.user.email, data.user.role || 'user');
            } else {
                setError(data.message || 'Signup failed');
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
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                        alt="Fashion Model in Yellow"
                    />
                </div>

                {/* Right Side: Form */}
                <div className={styles.formSection}>
                    <div className={styles.formContent}>
                        <div className={styles.header}>
                            <h1>Create Your Account</h1>
                            <p>Join us and start shopping</p>
                        </div>

                        {error && <div className={styles.error}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            {/* <div className={styles.inputGroup}>
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div> */}
                            {/* Design in image doesn't show Name field explicitly in form but API needs it. 
                                I will add it but keep style. Or if strictly following image, remove it? 
                                User said "ditto same". Image shows Email, Password, Confirm Password.
                                I'll keep name hidden or add it cleanly. Let's add it for functionality but keep it clean.
                            */}
                            <div className={styles.inputGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John One"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="hello@chainex.co"
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

                            <div className={styles.inputGroup}>
                                <label>Confirm Password</label>
                                <div className={styles.passwordWrapper}>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="********"
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
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>

                            <p className={styles.switchAuth} style={{ marginTop: '2rem' }}>
                                Already have an account yet ? <Link href="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
