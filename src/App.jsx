import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const handleAppReady = () => {
    setCurrentScreen('login')
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

  // Check if app is already installed as PWA on initial load
  useEffect(() => {
    const isPWAInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                          window.navigator.standalone === true
    
    if (isPWAInstalled) {
      // If already installed as PWA, proceed directly to login
      setCurrentScreen('login')
    }
    // If not installed, stay on splash screen to show install button
  }, [])

  return (
    <div className="App">
      {currentScreen === 'splash' && (
        <SplashScreen onAppReady={handleAppReady} />
      )}
      
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}
      
      {currentScreen === 'dashboard' && isLoggedIn && (
        <Dashboard username={username} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
