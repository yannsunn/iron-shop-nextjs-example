'use client';

import { useEffect, useState } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  registration: ServiceWorkerRegistration | null;
  isOnline: boolean;
  updateAvailable: boolean;
  installing: boolean;
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    registration: null,
    isOnline: true,
    updateAvailable: false,
    installing: false,
  });

  useEffect(() => {
    // Check if service workers are supported
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    setState(prev => ({ ...prev, isSupported: true, isOnline: navigator.onLine }));

    // Register service worker
    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('Service Worker registered:', registration);

        setState(prev => ({
          ...prev,
          isRegistered: true,
          registration,
        }));

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          setState(prev => ({ ...prev, installing: true }));

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              setState(prev => ({ ...prev, installing: false }));
              
              if (navigator.serviceWorker.controller) {
                // Update available
                setState(prev => ({ ...prev, updateAvailable: true }));
              }
            }
          });
        });

        // Listen for waiting service worker
        if (registration.waiting) {
          setState(prev => ({ ...prev, updateAvailable: true }));
        }

      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    registerSW();

    // Listen for online/offline events
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for service worker messages
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CACHE_UPDATED') {
        setState(prev => ({ ...prev, updateAvailable: true }));
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, []);

  const updateServiceWorker = () => {
    if (!state.registration?.waiting) return;

    state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    setState(prev => ({ ...prev, updateAvailable: false }));
    
    // Reload page after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const unregister = async () => {
    if (!state.registration) return false;

    const result = await state.registration.unregister();
    if (result) {
      setState(prev => ({
        ...prev,
        isRegistered: false,
        registration: null,
        updateAvailable: false,
      }));
    }
    return result;
  };

  return {
    ...state,
    updateServiceWorker,
    unregister,
  };
}

export default useServiceWorker;