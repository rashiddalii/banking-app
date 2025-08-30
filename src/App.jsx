import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [isPWA, setIsPWA] = useState(false)

  const handleAppReady = () => {
    // Only allow access if it's a PWA
    if (isPWA) {
      setCurrentScreen('login')
    } else {
      // Stay on splash screen if not PWA
      setCurrentScreen('splash')
    }
  }

  const handleLogin = (user) => {
    setUsername(user)
    setIsLoggedIn(true)
    setCurrentScreen('dashboard')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setCurrentScreen('login')
  }

  // Check if app is running as PWA on initial load
  useEffect(() => {
    const checkIfPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          window.navigator.standalone === true
      
      if (isStandalone) {
        setIsPWA(true)
        // PWA users stay on splash screen - no auto-transition
        // They need to manually proceed or the splash screen handles it
      } else {
        setIsPWA(false)
        // Browser users stay on splash screen to show install button
      }
    }

    checkIfPWA()
  }, [])

  // Block access if not PWA
  if (!isPWA && currentScreen !== 'splash') {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center justify-center p-4">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-xl mb-6">Swiss Bank only works when installed as an app.</p>
          <p className="text-lg">Please install the app to access your banking features.</p>
          <button
            onClick={() => setCurrentScreen('splash')}
            className="mt-6 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Back to Install
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      {currentScreen === 'splash' && (
        <SplashScreen onAppReady={handleAppReady} isPWA={isPWA} />
      )}
      
      {currentScreen === 'login' && isPWA && (
        <LoginScreen onLogin={handleLogin} />
      )}
      
      {currentScreen === 'dashboard' && isPWA && isLoggedIn && (
        <Dashboard username={username} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
