"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
    name: string;
    email: string;
    role: 'admin' | 'customer';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, role: 'admin' | 'customer') => void;
    logout: () => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check localStorage for persisted session
        const storedUser = localStorage.getItem('faxico_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user session");
            }
        }
    }, []);

    const login = (email: string, role: 'admin' | 'customer') => {
        const newUser: User = {
            name: role === 'admin' ? 'Administrator' : 'Customer',
            email,
            role
        };
        setUser(newUser);
        localStorage.setItem('faxico_user', JSON.stringify(newUser));

        // Redirect based on role
        if (role === 'admin') {
            router.push('/admin');
        } else {
            router.push('/');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('faxico_user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
