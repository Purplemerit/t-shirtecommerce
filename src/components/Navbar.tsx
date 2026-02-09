"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, ChevronDown, Menu, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import CartDrawer from './CartDrawer';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalItems } = useCart();
  const { user, isAdmin } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname === '/login' || pathname === '/signup' || pathname?.startsWith('/admin')) return null;

  return (
    <>
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
        <div className="container">
          {/* Top Row */}
          <div className={styles.topRow}>
            <div className={styles.left}>
              <button className={styles.menuBtn}><Menu size={24} /></button>
            </div>

            <Link href="/" className={styles.logo}>
              Faxico
            </Link>

            <div className={styles.right}>
              <div className={styles.topLinks}>
                <Link href="/about">About Us</Link>
                <Link href="/chat">Lets Chat</Link>
              </div>
              <div className={styles.icons}>
                {!user ? (
                  <div className={styles.authLinks}>
                    <Link href="/login" className={styles.loginText}>Login</Link>
                    <Link href="/signup" className={styles.signupBtn}>Sign Up</Link>
                  </div>
                ) : (
                  <>
                    <Link href="/account">
                      <Heart size={20} />
                    </Link>
                    <button onClick={() => setIsCartOpen(true)} className={styles.cartBtn}>
                      <ShoppingBag size={20} />
                      {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                    </button>
                    <Link href="/account" className={styles.profileCircle}>
                      <User size={18} />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row - Buttons */}
          <div className={styles.bottomRow}>
            <div className={styles.navButtons}>
              <div className={styles.navBtnGroup}>
                <button className={styles.navBtn}>Categories <ChevronDown size={14} /></button>
                <button className={styles.navBtn}>New Product <ChevronDown size={14} /></button>
              </div>

              <div className={styles.searchBox}>
                <input type="text" placeholder="Search" />
                <Search size={18} className={styles.searchIcon} />
              </div>

              <div className={styles.tagGroup}>
                <Link href="/products?category=men" className={styles.tagBtn}>Men</Link>
                <Link href="/products?category=women" className={styles.tagBtn}>Women</Link>
                <Link href="/products?category=children" className={styles.tagBtn}>Children</Link>
                <Link href="/products?category=new" className={styles.tagBtn}>New Brand</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
