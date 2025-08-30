import { useState, useEffect } from 'react'

const SplashScreen = ({ onAppReady, isPWA }) => {
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isPWAInstalled, setIsPWAInstalled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if app is already installed as PWA
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true) {
        setIsPWAInstalled(true)
        setShowInstallButton(false)
        return true
      }
      return false
    }

    // Handle beforeinstallprompt event (only for browser users)
    const handleBeforeInstallPrompt = (e) => {
      if (!isPWA) { // Only handle for browser users
        e.preventDefault()
        setDeferredPrompt(e)
        setShowInstallButton(true)
        setLoading(false)
        console.log('PWA install prompt available')
      }
    }

    // Handle appinstalled event
    const handleAppInstalled = () => {
      console.log('PWA was installed')
      setShowInstallButton(false)
      setDeferredPrompt(null)
      setIsPWAInstalled(true)
      // Don't auto-transition - let user manually open the app
    }

    // Check if already installed first
    if (!checkIfInstalled()) {
      // If not installed, show appropriate content immediately
      setLoading(false)
      
      // Listen for install events (only for browser users)
      if (!isPWA) {
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('appinstalled', handleAppInstalled)

        return () => {
          window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
          window.removeEventListener('appinstalled', handleAppInstalled)
        }
      }
    }
  }, [onAppReady, isPWA, isPWAInstalled])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        console.log(`User response to the install prompt: ${outcome}`)
        
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        
        setDeferredPrompt(null)
        setShowInstallButton(false)
      } catch (error) {
        console.error('Error during install prompt:', error)
      }
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-10"></div>
          <svg className="w-16 h-16 text-blue-900 relative z-10" viewBox="0 0 120 120" fill="none">
            <defs>
              <linearGradient id="bgGradSplash" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: "#ffffff"}} />
                <stop offset="100%" style={{stopColor: "#f0f8ff"}} />
              </linearGradient>
              <linearGradient id="borderGradSplash" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: "#3b82f6"}} />
                <stop offset="50%" style={{stopColor: "#1e40af"}} />
                <stop offset="100%" style={{stopColor: "#1e3a8a"}} />
              </linearGradient>
              <linearGradient id="letterGradSplash" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: "#3b82f6"}} />
                <stop offset="50%" style={{stopColor: "#2563eb"}} />
                <stop offset="100%" style={{stopColor: "#1e40af"}} />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="58" fill="url(#bgGradSplash)" stroke="url(#borderGradSplash)" strokeWidth="2"/>
            <g transform="translate(60, 60)">
              <path d="M-25 -20 Q-25 -30 -15 -30 Q-5 -30 -5 -20 Q-5 -10 -15 -10 Q-25 -10 -25 0 Q-25 10 -15 10 Q-5 10 -5 20 Q-5 30 -15 30 Q-25 30 -25 20" 
                    fill="none" stroke="url(#letterGradSplash)" strokeWidth="4" strokeLinecap="round"/>
              <path d="M-5 -30 L-5 30 M-5 -30 Q15 -30 15 -15 Q15 0 -5 0 Q15 0 15 15 Q15 30 -5 30" 
                    fill="none" stroke="url(#letterGradSplash)" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="-5" cy="0" r="2" fill="#3b82f6"/>
            </g>
          </svg>
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-4">
          Swiss Bank
        </h1>
        
        <p className="text-blue-100 text-xl mb-8">
          Your Trusted Banking Partner
        </p>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-blue-100 text-lg">Loading...</p>
          </div>
        )}

        {/* Install Button - Only for browser users, shows immediately */}
        {showInstallButton && !loading && !isPWA && (
          <div className="space-y-4">
            <p className="text-blue-100 text-lg mb-6">
              Install Swiss Bank for the best experience
            </p>
            <button
              onClick={handleInstallClick}
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              📱 Install Swiss Bank App
            </button>
          </div>
        )}

        {/* App Installed Message - Shows when user installs the app */}
        {isPWAInstalled && (
          <div className="space-y-4">
            <div className="animate-pulse">
              <p className="text-green-300 text-lg mb-4">
                ✅ Swiss Bank App Installed!
              </p>
              <p className="text-blue-100 text-sm mb-4">
                The app has been installed on your device
              </p>
              <p className="text-blue-100 text-xs">
                Please open the app from your home screen to access your banking features
              </p>
            </div>
          </div>
        )}

        {/* PWA User Message - Shows when user opens the installed app */}
        {isPWA && !isPWAInstalled && !loading && (
          <div className="space-y-4">
            <div className="animate-pulse">
              <p className="text-blue-100 text-lg mb-4">
                🚀 Welcome to Swiss Bank!
              </p>
              <p className="text-blue-100 text-sm">
                Opening your banking app...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SplashScreen
