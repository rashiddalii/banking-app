const CACHE_NAME = 'swiss-bank-v1.0.0'
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.svg'
]

// Install event - cache files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching files...')
        return cache.addAll(FILES_TO_CACHE)
      })
      .then(() => {
        console.log('Service Worker installed successfully')
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log('Service Worker activated successfully')
      return self.clients.claim()
    })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Handle navigation requests (SPA routing)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return caches.match('/index.html')
        })
    )
    return
  }

  // Handle static assets (JS, CSS, images)
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image' ||
      request.url.includes('.js') ||
      request.url.includes('.css') ||
      request.url.includes('.svg') ||
      request.url.includes('.png')) {
    
    event.respondWith(
      caches.match(request)
        .then((response) => {
          // Return cached version if available
          if (response) {
            return response
          }
          
          // Fetch from network
          return fetch(request)
            .then((fetchResponse) => {
              // Don't cache failed responses
              if (!fetchResponse || fetchResponse.status !== 200) {
                return fetchResponse
              }
              
              // Clone the response for caching
              const responseToCache = fetchResponse.clone()
              
              // Cache successful responses
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseToCache)
                })
              
              return fetchResponse
            })
            .catch(() => {
              // Return offline fallback for critical assets
              if (request.url.includes('index.html')) {
                return caches.match('/index.html')
              }
              return null
            })
        })
    )
    return
  }

  // For all other requests, try network first, then cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseToCache)
            })
        }
        return response
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(request)
      })
  )
})

// Listen for beforeinstallprompt event
self.addEventListener('beforeinstallprompt', (event) => {
  console.log('PWA install prompt available')
  // Store the event for later use
  self.deferredPrompt = event
})

// Listen for appinstalled event
self.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed successfully')
  // Clear the deferred prompt
  self.deferredPrompt = null
})
