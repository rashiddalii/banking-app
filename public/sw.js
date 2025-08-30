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
  console.log('Fetching:', event.request.url)
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
      .catch(() => {
        // Fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html')
        }
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
