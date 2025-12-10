// Service Worker for Offline Mode
const CACHE_NAME = 'quran-chat-v1';
const OFFLINE_CACHE = 'quran-offline-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sounds/adhan-mishary.mp3',
  '/sounds/adhan-abdul-basit.mp3',
  '/sounds/adhan-makkah.mp3',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== OFFLINE_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle API requests (Quran API)
  if (url.hostname === 'api.alquran.cloud') {
    event.respondWith(
      caches.open(OFFLINE_CACHE).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Return cached version if offline
            return cache.match(request).then((cachedResponse) => {
              if (cachedResponse) {
                console.log('[SW] Serving from cache:', request.url);
                return cachedResponse;
              }
              // Return offline fallback
              return new Response(
                JSON.stringify({ error: 'Offline - keine Verbindung' }),
                {
                  headers: { 'Content-Type': 'application/json' },
                  status: 503,
                }
              );
            });
          });
      })
    );
    return;
  }

  // Handle app assets - cache first, then network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Cache the response for future use
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Message event - handle messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Push event - handle push notifications for prayer times
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  
  const options = {
    body: data.body || 'Es ist Zeit für das Gebet',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [500, 200, 500, 200, 500], // Longer vibration pattern for prayer time
    tag: data.tag || 'prayer-notification',
    requireInteraction: true,
    actions: [
      { action: 'open', title: 'Öffnen' },
      { action: 'dismiss', title: 'Schließen' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Gebetszeit', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
