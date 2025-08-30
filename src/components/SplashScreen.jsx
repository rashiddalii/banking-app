import { useState, useEffect } from 'react'

const SplashScreen = () => {
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
      console.log('PWA install prompt available')
    }

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      console.log('PWA was installed')
      setShowInstallButton(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log(`User response to the install prompt: ${outcome}`)
      setDeferredPrompt(null)
      setShowInstallButton(false)
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-10"></div>
          <svg className="w-12 h-12 text-blue-900 relative z-10" viewBox="0 0 120 120" fill="none">
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
        
        <h1 className="text-4xl font-bold text-white mb-3">
          Swiss Bank
        </h1>
        
        <p className="text-blue-100 text-lg">
          Your Trusted Banking Partner
        </p>
        
        {/* Install Button */}
        {showInstallButton && (
          <button
            onClick={handleInstallClick}
            className="mt-6 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-50 transition-colors duration-200"
          >
            📱 Install App
          </button>
        )}
        
        {/* Loading indicator */}
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
