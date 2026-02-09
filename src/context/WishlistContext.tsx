"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    originalPrice?: number;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    toggleWishlist: (item: WishlistItem) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('faxico-wishlist');
        if (saved) {
            try {
                setWishlist(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage when updated
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('faxico-wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, isLoaded]);

    const addToWishlist = (item: WishlistItem) => {
        setWishlist(prev => {
            if (prev.some(i => i.id === item.id)) return prev;
            return [...prev, item];
        });
    };

    const removeFromWishlist = (id: string) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    const isInWishlist = (id: string) => {
        return wishlist.some(item => item.id === id);
    };

    const toggleWishlist = (item: WishlistItem) => {
        if (isInWishlist(item.id)) {
            removeFromWishlist(item.id);
        } else {
            addToWishlist(item);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
