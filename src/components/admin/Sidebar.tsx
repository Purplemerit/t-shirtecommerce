"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    ShoppingCart,
    Package,
    Users,
    FileText,
    BarChart2,
    Percent,
    Globe,
    CreditCard,
    Settings,
    Grid,
    ChevronDown,
    ChevronRight,
    Megaphone,
    Heart
} from 'lucide-react';
import styles from '@/app/admin/admin.module.css';

const SidebarItem = ({
    href,
    icon: Icon,
    label,
    active,
    hasSubmenu = false,
    expanded = false,
    onToggle,
    indent = false
}: {
    href: string;
    icon?: any;
    label: string;
    active?: boolean;
    hasSubmenu?: boolean;
    expanded?: boolean;
    onToggle?: () => void;
    indent?: boolean;
}) => {
    return (
        <div className={`${styles.navItem} ${active ? styles.active : ''}`} style={indent ? { paddingLeft: 38, fontSize: 13, opacity: 0.8 } : {}} onClick={hasSubmenu ? onToggle : undefined}>
            {Icon && (
                <div className={styles.navIcon}>
                    <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                </div>
            )}
            {!hasSubmenu ? (
                <Link href={href} style={{ flex: 1, color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    {label}
                </Link>
            ) : (
                <div style={{ flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    {label}
                </div>
            )}
            {hasSubmenu && (
                <div style={{ marginLeft: 'auto', opacity: 0.5 }}>
                    {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>
            )}
        </div>
    );
};

export const Sidebar = () => {
    const pathname = usePathname();
    const [ordersExpanded, setOrdersExpanded] = useState(false);
    const [productsExpanded, setProductsExpanded] = useState(true);
    const [customersExpanded, setCustomersExpanded] = useState(false);
    const [marketingExpanded, setMarketingExpanded] = useState(false);
    const [analyticsExpanded, setAnalyticsExpanded] = useState(false);
    const [contentExpanded, setContentExpanded] = useState(false);
    const [salesExpanded, setSalesExpanded] = useState(false);
    const [posExpanded, setPosExpanded] = useState(false);

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    return (
        <aside className={styles.sidebar}>
            <div className={styles.storeName}>
                <div style={{ width: 32, height: 32, background: '#000', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Heart size={16} fill="#ff4d00" stroke="#ff4d00" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 14, fontWeight: 800 }}>Faxico Admin</span>
                    <span style={{ fontSize: 10, color: '#8c9196', fontWeight: 600 }}>Pro Plan</span>
                </div>
                <ChevronDown size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
            </div>

            <div className={styles.navSection} style={{ flex: 1, overflowY: 'auto' }}>
                <SidebarItem href="/admin" icon={Home} label="Home" active={pathname === '/admin'} />

                {/* Orders */}
                <SidebarItem
                    href="#"
                    icon={ShoppingCart}
                    label="Orders"
                    hasSubmenu
                    expanded={ordersExpanded}
                    onToggle={() => setOrdersExpanded(!ordersExpanded)}
                    active={isActive('/admin/orders')}
                />
                {(ordersExpanded || isActive('/admin/orders')) && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <SidebarItem href="/admin/orders" label="All orders" indent active={pathname === '/admin/orders'} />
                        <SidebarItem href="/admin/orders/drafts" label="Drafts" indent active={isActive('/admin/orders/drafts')} />
                    </div>
                )}

                {/* Products */}
                <SidebarItem
                    href="#"
                    icon={Package}
                    label="Products"
                    hasSubmenu
                    expanded={productsExpanded}
                    onToggle={() => setProductsExpanded(!productsExpanded)}
                    active={isActive('/admin/products')}
                />
                {(productsExpanded || isActive('/admin/products')) && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <SidebarItem href="/admin/products" label="All products" indent active={pathname === '/admin/products'} />
                        <SidebarItem href="/admin/products/collections" label="Collections" indent active={isActive('/admin/products/collections')} />
                        <SidebarItem href="/admin/products/gift_cards" label="Gift cards" indent active={isActive('/admin/products/gift_cards')} />
                    </div>
                )}

                {/* Customers */}
                <SidebarItem
                    href="#"
                    icon={Users}
                    label="Customers"
                    hasSubmenu
                    expanded={customersExpanded}
                    onToggle={() => setCustomersExpanded(!customersExpanded)}
                    active={isActive('/admin/customers')}
                />
                {(customersExpanded || isActive('/admin/customers')) && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <SidebarItem href="/admin/customers" label="Segments" indent active={pathname === '/admin/customers'} />
                    </div>
                )}

                <SidebarItem href="/admin/discounts" icon={Percent} label="Discounts" active={isActive('/admin/discounts')} />

                <div className={styles.navLabel} style={{ marginTop: 24 }}>Sales Channels</div>

                {/* Online Store */}
                <SidebarItem
                    href="#"
                    icon={Globe}
                    label="Online Store"
                    hasSubmenu
                    expanded={salesExpanded}
                    onToggle={() => setSalesExpanded(!salesExpanded)}
                    active={isActive('/admin/online-store')}
                />
                {(salesExpanded || isActive('/admin/online-store')) && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <SidebarItem href="/admin/online-store" label="Themes" indent active={pathname === '/admin/online-store'} />
                        <SidebarItem href="/admin/online-store/pages" label="Pages" indent active={isActive('/admin/online-store/pages')} />
                    </div>
                )}

                <SidebarItem href="/admin/apps" icon={Grid} label="Apps" active={isActive('/admin/apps')} />
            </div>

            <div className={styles.settingsLink} style={{ borderTop: '1px solid #e1e3e5', paddingTop: 16 }}>
                <Link href="/admin/settings" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none', width: '100%' }}>
                    <Settings size={18} style={{ marginRight: 12 }} />
                    Settings
                </Link>
            </div>
        </aside>
    );
};
