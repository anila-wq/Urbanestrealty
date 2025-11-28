import React, { Suspense, useEffect, lazy, StrictMode, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Toaster } from './components/ui/simple-toast';
import { ThankYou } from './components/ThankYou';

// Lazy load below-the-fold components for better initial load
const AboutUs = lazy(() => import('./components/AboutUs').then(m => ({ default: m.AboutUs })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const Awards = lazy(() => import('./components/Awards').then(m => ({ default: m.Awards })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const WhatsAppFloat = lazy(() => import('./components/WhatsAppFloat').then(m => ({ default: m.WhatsAppFloat })));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center text-gray-900">
            <h1 className="text-2xl mb-4">Something went wrong</h1>
            <button
              className="px-4 py-2 bg-gray-900 text-white rounded"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    // Check URL hash to determine view
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#thankyou')) {
        setCurrentView('thankyou');
      } else {
        setCurrentView('home');
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  useEffect(() => {

    // Prefetch external project links for faster navigation
    const prefetchLinks = [
      'https://www.urbanesteastfield.com/',
      'https://sereneexotica.in',
      'https://date-relume-15377570.figma.site'
    ];

    prefetchLinks.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = url;
      document.head.appendChild(link);
    });

    // Google Analytics & Google Ads Setup - Optimized for performance
    const GA_MEASUREMENT_ID = 'G-T7R1X8ZEHW';
    const GOOGLE_ADS_ID = 'AW-11565888128';
    
    // Defer analytics loading to not block main thread
    const loadAnalytics = () => {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        'page_title': 'Urbanest Realty - Premium Real Estate in Bangalore',
        'page_location': window.location.href,
        'page_path': window.location.pathname,
      });
      gtag('config', GOOGLE_ADS_ID);
      gtag('event', 'page_view', {
        page_title: 'Urbanest Realty - Home',
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    };

    // Load analytics after page is interactive
    if (document.readyState === 'complete') {
      setTimeout(loadAnalytics, 1000);
    } else {
      window.addEventListener('load', () => setTimeout(loadAnalytics, 1000));
    }

    // Simplified console log (only in development)
    if (process.env.NODE_ENV !== 'production') {
      console.log('🏢 URBANEST REALTY - Ready');
    }
  }, []);

  return (
    <ErrorBoundary>
      {currentView === 'thankyou' ? (
        <ThankYou />
      ) : (
        <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
          {/* Critical above-the-fold content - loaded immediately */}
          <Navigation />
          <Hero />
          <Projects />
          
          {/* Below-the-fold content - lazy loaded for better performance */}
          <Suspense fallback={<div className="h-20" />}>
            <AboutUs />
            <Testimonials />
            <Awards />
            <Footer />
            <WhatsAppFloat />
          </Suspense>
          
          <Toaster />
        </div>
      )}
    </ErrorBoundary>
  );
}