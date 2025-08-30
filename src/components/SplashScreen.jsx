import { useState, useEffect } from 'react'

const SplashScreen = ({ onAppReady, isPWA }) => {
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isPWAInstalled, setIsPWAInstalled] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [loading, setLoading] = useState(true)
  const [minDelayComplete, setMinDelayComplete] = useState(false)

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

    // Minimum 3-second delay for splash screen
    const minDelayTimer = setTimeout(() => {
      setMinDelayComplete(true)
      
      // If PWA user, auto-transition to login after delay
      if (isPWA && !isPWAInstalled) {
        setTimeout(() => {
          onAppReady()
        }, 500) // Small additional delay for smooth transition
      }
    }, 3000)

    // Handle beforeinstallprompt event (only for browser users)
    const handleBeforeInstallPrompt = (e) => {
      if (!isPWA) { // Only handle for browser users
        e.preventDefault()
        setDeferredPrompt(e)
        if (minDelayComplete) {
          setShowInstallButton(true)
        }
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
      // Proceed to app after installation
      setTimeout(() => {
        onAppReady()
      }, 1000)
    }

    // Check if already installed first
    if (!checkIfInstalled()) {
      // If not installed, show appropriate content after minimum delay
      setTimeout(() => {
        setLoading(false)
        if (!isPWA && !showInstallButton && minDelayComplete) {
          setShowInstructions(true)
        }
      }, 3000) // Show install instructions after 3 seconds

      // Listen for install events (only for browser users)
      if (!isPWA) {
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('appinstalled', handleAppInstalled)

        return () => {
          clearTimeout(minDelayTimer)
          window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
          window.removeEventListener('appinstalled', handleAppInstalled)
        }
      }
    } else {
      clearTimeout(minDelayTimer)
    }

    return () => {
      clearTimeout(minDelayTimer)
    }
  }, [onAppReady, showInstallButton, minDelayComplete, isPWA, isPWAInstalled])

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
          setShowInstructions(true)
        }
        
        setDeferredPrompt(null)
        setShowInstallButton(false)
      } catch (error) {
        console.error('Error during install prompt:', error)
        setShowInstructions(true)
      }
    } else {
      setShowInstructions(true)
    }
  }

  const showInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAndroid = /Android/.test(navigator.userAgent)
    
    let message = ''
    
    if (isIOS) {
      message = 'To install Swiss Bank:\n\n1. Tap the Share button (square with arrow)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to confirm\n\nThen open the app from your home screen!'
    } else if (isAndroid) {
      message = 'To install Swiss Bank:\n\n1. Tap the three dots menu (⋮)\n2. Tap "Add to Home Screen" or "Install App"\n3. Tap "Add" to confirm\n\nThen open the app from your home screen!'
    } else {
      message = 'To install Swiss Bank:\n\nLook for the install button in your browser\'s address bar or menu\n\nThen open the app from your home screen!'
    }
    
    alert(message)
  }

  // Block browser access - no continue in browser option
  const handleContinueInBrowser = () => {
    // Show message that app only works when installed
    alert('Swiss Bank only works when installed as an app.\n\nPlease install the app to access your banking features.')
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

        {/* Install Button - Only for browser users */}
        {showInstallButton && !loading && minDelayComplete && !isPWA && (
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
            <div className="mt-4">
              <button
                onClick={handleContinueInBrowser}
                className="text-blue-100 underline text-sm hover:text-white transition-colors"
              >
                Continue in browser
              </button>
            </div>
          </div>
        )}

        {/* Manual Install Instructions - Only for browser users */}
        {showInstructions && !showInstallButton && !loading && minDelayComplete && !isPWA && (
          <div className="space-y-4">
            <p className="text-blue-100 text-lg mb-6">
              Install Swiss Bank for the best experience
            </p>
            <button
              onClick={showInstallInstructions}
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              📱 How to Install
            </button>
            <div className="mt-4">
              <button
                onClick={handleContinueInBrowser}
                className="text-blue-100 underline text-sm hover:text-white transition-colors"
              >
                Continue in browser
              </button>
            </div>
          </div>
        )}

        {/* PWA Installed Message */}
        {isPWAInstalled && (
          <div className="space-y-4">
            <div className="animate-pulse">
              <p className="text-green-300 text-lg mb-4">
                ✅ Swiss Bank App Installed!
              </p>
              <p className="text-blue-100 text-sm">
                Opening your banking app...
              </p>
            </div>
          </div>
        )}

        {/* PWA User Message - After 3 seconds */}
        {isPWA && minDelayComplete && !isPWAInstalled && (
          <div className="space-y-4">
            <div className="animate-pulse">
              <p className="text-blue-100 text-lg mb-4">
                🚀 Opening Swiss Bank...
              </p>
              <p className="text-blue-100 text-sm">
                Please wait while we prepare your banking experience
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SplashScreen
