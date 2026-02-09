'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Oops! Something went wrong</h1>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        We're sorry for the inconvenience. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            padding: '0.75rem 2rem',
                            background: '#000',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Go to Homepage
                    </button>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '600px' }}>
                            <summary style={{ cursor: 'pointer', marginBottom: '1rem' }}>Error Details</summary>
                            <pre style={{
                                background: '#f5f5f5',
                                padding: '1rem',
                                borderRadius: '4px',
                                overflow: 'auto',
                                fontSize: '0.875rem'
                            }}>
                                {this.state.error.toString()}
                                {this.state.error.stack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
