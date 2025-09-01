import { useState } from 'react'

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call delay
    setTimeout(() => {
      if (username === 'saeed_ahmad' && password === 'swissbank123') {
        onLogin(username)
      } else {
        setError('Invalid username or password')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 opacity-30"></div>
            <svg className="w-10 h-10 text-white relative z-10" viewBox="0 0 120 120" fill="none">
              <defs>
                <linearGradient id="bgGradLogin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: "#ffffff"}} />
                  <stop offset="100%" style={{stopColor: "#f0f8ff"}} />
                </linearGradient>
                <linearGradient id="borderGradLogin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: "#ffffff"}} />
                  <stop offset="50%" style={{stopColor: "#f8fafc"}} />
                  <stop offset="100%" style={{stopColor: "#f1f5f9"}} />
                </linearGradient>
                <linearGradient id="letterGradLogin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: "#ffffff"}} />
                  <stop offset="50%" style={{stopColor: "#f8fafc"}} />
                  <stop offset="100%" style={{stopColor: "#f1f5f9"}} />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="58" fill="url(#bgGradLogin)" stroke="url(#borderGradLogin)" strokeWidth="2"/>
              <g transform="translate(60, 60)">
                <path d="M-25 -20 Q-25 -30 -15 -30 Q-5 -30 -5 -20 Q-5 -10 -15 -10 Q-25 -10 -25 0 Q-25 10 -15 10 Q-5 10 -5 20 Q-5 30 -15 30 Q-25 30 -25 20" 
                      fill="none" stroke="url(#letterGradLogin)" strokeWidth="4" strokeLinecap="round"/>
                <path d="M-5 -30 L-5 30 M-5 -30 Q15 -30 15 -15 Q15 0 -5 0 Q15 0 15 15 Q15 30 -5 30" 
                      fill="none" stroke="url(#letterGradLogin)" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="-5" cy="0" r="2" fill="white"/>
              </g>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Swiss Bank</h1>
          <p className="text-gray-600 text-sm mt-2">Secure Banking Access</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginScreen
