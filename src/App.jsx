import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash') // splash, login, dashboard
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Show splash screen for 2 seconds, then go to login
    const timer = setTimeout(() => {
      setCurrentScreen('login')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (user) => {
    setUsername(user)
    setCurrentScreen('dashboard')
  }

  const handleLogout = () => {
    setUsername('')
    setCurrentScreen('login')
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />
      case 'login':
        return <LoginScreen onLogin={handleLogin} />
      case 'dashboard':
        return <Dashboard username={username} onLogout={handleLogout} />
      default:
        return <LoginScreen onLogin={handleLogin} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
    </div>
  )
}

export default App
