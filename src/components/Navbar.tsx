"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, ChevronDown, Menu, Heart, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import CartDrawer from './CartDrawer';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalItems } = useCart();
  const { user, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('q');
    if (query) {
      router.push(`/products?search=${query}`);
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

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
              <button
                className={styles.menuBtn}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Menu"
              >
                <Menu size={24} />
              </button>
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
                <div style={{ position: 'relative' }}>
                  <button
                    className={styles.navBtn}
                    onClick={() => toggleDropdown('categories')}
                  >
                    Categories <ChevronDown size={14} />
                  </button>
                  <div className={`${styles.dropdown} ${activeDropdown === 'categories' ? styles.active : ''}`}>
                    <Link href="/products?category=men" className={styles.dropdownItem}>Men</Link>
                    <Link href="/products?category=women" className={styles.dropdownItem}>Women</Link>
                    <Link href="/products?category=children" className={styles.dropdownItem}>Children</Link>
                    <Link href="/products?category=new" className={styles.dropdownItem}>New Arrivals</Link>
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <button
                    className={styles.navBtn}
                    onClick={() => toggleDropdown('new')}
                  >
                    New Product <ChevronDown size={14} />
                  </button>
                  <div className={`${styles.dropdown} ${activeDropdown === 'new' ? styles.active : ''}`}>
                    <Link href="/products?sort=newest" className={styles.dropdownItem}>Latest Drops</Link>
                    <Link href="/products?sort=best-selling" className={styles.dropdownItem}>Best Sellers</Link>
                  </div>
                </div>
              </div>

              <form className={styles.searchBox} onSubmit={handleSearch}>
                <input type="text" name="q" placeholder="Search" />
                <button type="submit" className={styles.searchIcon} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
                  <Search size={18} />
                </button>
              </form>

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
      {/* Spacer to prevent content overlap */}
      <div className={styles.navSpacer} />

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ''}`} onClick={() => setIsMobileMenuOpen(false)} />
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <span className={styles.logo}>Faxico</span>
          <button className={styles.closeBtn} onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.mobileMenuContent}>
          <Link href="/" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/products?category=men" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Men</Link>
          <Link href="/products?category=women" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Women</Link>
          <Link href="/products?category=children" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Children</Link>
          <Link href="/about" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link href="/chat" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Lets Chat</Link>
          {!user && (
            <>
              <Link href="/login" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link href="/signup" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
