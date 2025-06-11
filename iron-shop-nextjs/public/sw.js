const CACHE_NAME = 'iron-shop-v1';
const STATIC_CACHE_NAME = 'iron-shop-static-v1';
const DYNAMIC_CACHE_NAME = 'iron-shop-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add other critical assets
];

// Runtime caching strategies
const CACHE_STRATEGIES = {
  // Cache static assets (JS, CSS, images) with cache-first strategy
  static: /\.(js|css|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|eot)$/,
  
  // Cache API responses with network-first strategy
  api: /^\/api\//,
  
  // Cache pages with stale-while-revalidate strategy
  pages: /^\/(?!api)/,
};

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('[SW] Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Error caching static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Handle different types of requests
  if (CACHE_STRATEGIES.static.test(url.pathname)) {
    // Static assets - cache first strategy
    event.respondWith(cacheFirst(request));
  } else if (CACHE_STRATEGIES.api.test(url.pathname)) {
    // API requests - network first strategy
    event.respondWith(networkFirst(request));
  } else if (CACHE_STRATEGIES.pages.test(url.pathname)) {
    // Pages - stale while revalidate strategy
    event.respondWith(staleWhileRevalidate(request));
  } else {
    // Default - network first
    event.respondWith(networkFirst(request));
  }
});

// Cache-first strategy (good for static assets)
async function cacheFirst(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }
    
    console.log('[SW] Fetching and caching:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache-first error:', error);
    return new Response('Offline content not available', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

// Network-first strategy (good for API requests)
async function networkFirst(request) {
  try {
    console.log('[SW] Fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineCache = await caches.open(STATIC_CACHE_NAME);
      const offlinePage = await offlineCache.match('/offline.html');
      return offlinePage || new Response('Offline', { status: 503 });
    }
    
    return new Response('Network error', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

// Stale-while-revalidate strategy (good for pages)
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Fetch updated version in background
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch((error) => {
      console.warn('[SW] Background fetch failed:', error);
    });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    console.log('[SW] Serving stale content:', request.url);
    return cachedResponse;
  }
  
  // If no cache, wait for network
  console.log('[SW] No cache, waiting for network:', request.url);
  return fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

// Sync contact form submissions when back online
async function syncContactForm() {
  try {
    const cache = await caches.open('contact-forms');
    const requests = await cache.keys();
    
    for (const request of requests) {
      try {
        const response = await cache.match(request);
        const formData = await response.json();
        
        // Retry the submission
        const result = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (result.ok) {
          await cache.delete(request);
          console.log('[SW] Contact form synced successfully');
        }
      } catch (error) {
        console.error('[SW] Error syncing contact form:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Background sync error:', error);
  }
}

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'アイアンショップからの通知',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'サイトを見る',
        icon: '/icons/explore-icon.png',
      },
      {
        action: 'close',
        title: '閉じる',
        icon: '/icons/close-icon.png',
      },
    ],
  };
  
  event.waitUntil(
    self.registration.showNotification('アイアンショップ', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Notification is already closed
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Update available notification
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});