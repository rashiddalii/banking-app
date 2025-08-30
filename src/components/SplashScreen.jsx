import { useState, useEffect } from 'react'

const SplashScreen = ({ onAppReady }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Brief splash screen for PWA users
    const splashTimer = setTimeout(() => {
      setLoading(false)
      // Auto-transition to login after splash
      setTimeout(() => {
        onAppReady()
      }, 500)
    }, 2000) // 2-second splash screen

    return () => {
      clearTimeout(splashTimer)
    }
  }, [onAppReady])

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

        {/* Welcome Message - After loading */}
        {!loading && (
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
