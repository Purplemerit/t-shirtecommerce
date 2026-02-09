"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ChatPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to a support contact or handle chat initialization
        // For now, let's just redirect to support or show a "Coming Soon" for chat
        // To avoid 404, we'll show a nice "Faxico Support" landing or WhatsApp link

        // Simulating a redirect to WhatsApp or a support channel
        const timer = setTimeout(() => {
            router.push('/support'); // Fallback to support page if chat isn't ready
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f9fafb',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{
                background: '#fff',
                padding: '40px',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                textAlign: 'center',
                maxWidth: '400px'
            }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    background: '#ff4d00',
                    color: '#fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                }}>
                    <Loader2 className="animate-spin" size={32} />
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>Connecting to Faxico Support</h1>
                <p style={{ color: '#666', lineHeight: '1.6' }}>Please wait while we connect you to our support team...</p>
            </div>
        </div>
    );
}
