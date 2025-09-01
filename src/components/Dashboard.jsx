import { useState, useEffect } from 'react'

const Dashboard = ({ username, onLogout }) => {
  const [balance, setBalance] = useState(0)
  const [showTransferPopup, setShowTransferPopup] = useState(false)
  const [amount, setAmount] = useState('')

  const features = [
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ), 
      name: 'Transfer', 
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      action: () => setShowTransferPopup(true)
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ), 
      name: 'History', 
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      action: () => alert('History feature coming soon!')
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ), 
      name: 'Pay Bills', 
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      action: () => alert('Pay Bills feature coming soon!')
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ), 
      name: 'Withdraw', 
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      action: () => alert('Withdraw feature coming soon!')
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ), 
      name: 'Cards', 
      color: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      bgColor: 'bg-indigo-50',
      action: () => alert('Cards feature coming soon!')
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ), 
      name: 'Shopping', 
      color: 'bg-gradient-to-br from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50',
      action: () => alert('Shopping feature coming soon!')
    },
  ]

  const recentTransactions = [
    // { 
    //   type: 'Deposit', 
    //   amount: '+₨500', 
    //   date: 'Today', 
    //   status: 'completed',
    //   icon: (
    //     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    //     </svg>
    //   )
    // },
    // { 
    //   type: 'Transfer', 
    //   amount: '-₨25', 
    //   date: 'Yesterday', 
    //   status: 'completed',
    //   icon: (
    //     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    //     </svg>
    //   )
    // },
    { 
      type: 'Payment', 
      amount: '-₨120', 
      date: '2 days ago', 
      status: 'pending',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    }
  ]

  // Load balance from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('swissBankBalance')
    if (savedBalance) {
      setBalance(parseFloat(savedBalance))
    }
  }, [])

  const handleAddBalance = () => {
    const numAmount = parseFloat(amount)
    if (numAmount > 0) {
      const newBalance = balance + numAmount
      setBalance(newBalance)
      // Save to localStorage
      localStorage.setItem('swissBankBalance', newBalance.toString())
      setAmount('')
      setShowTransferPopup(false)
    }
  }

  const formatUsername = (username) => {
    return username.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 flex-shrink-0 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-20"></div>
              <svg className="w-5 h-5 text-blue-900 relative z-10" viewBox="0 0 120 120" fill="none">
                <defs>
                  <linearGradient id="bgGradDashboard" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: "#ffffff"}} />
                    <stop offset="100%" style={{stopColor: "#f0f8ff"}} />
                  </linearGradient>
                  <linearGradient id="borderGradDashboard" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: "#3b82f6"}} />
                    <stop offset="50%" style={{stopColor: "#1e40af"}} />
                    <stop offset="100%" style={{stopColor: "#1e3a8a"}} />
                  </linearGradient>
                  <linearGradient id="letterGradDashboard" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: "#3b82f6"}} />
                    <stop offset="50%" style={{stopColor: "#2563eb"}} />
                    <stop offset="100%" style={{stopColor: "#1e40af"}} />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="58" fill="url(#bgGradDashboard)" stroke="url(#borderGradDashboard)" strokeWidth="2"/>
                <g transform="translate(60, 60)">
                  <path d="M-25 -20 Q-25 -30 -15 -30 Q-5 -30 -5 -20 Q-5 -10 -15 -10 Q-25 -10 -25 0 Q-25 10 -15 10 Q-5 10 -5 20 Q-5 30 -15 30 Q-25 30 -25 20" 
                        fill="none" stroke="url(#letterGradDashboard)" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M-5 -30 L-5 30 M-5 -30 Q15 -30 15 -15 Q15 0 -5 0 Q15 0 15 15 Q15 30 -5 30" 
                        fill="none" stroke="url(#letterGradDashboard)" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="-5" cy="0" r="2" fill="#3b82f6"/>
                </g>
              </svg>
            </div>
            <h1 className="text-lg font-semibold">Swiss Bank</h1>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-xs">Welcome back</p>
            <p className="font-medium text-sm">{formatUsername(username)}</p>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Balance Card */}
        <div className="p-4">
          <div className="card bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative shadow-xl">
            <button
              onClick={onLogout}
              className="absolute top-3 right-3 text-white hover:text-blue-200 transition-colors duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-10"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            <div>
              <h2 className="text-base font-medium mb-1">Current Balance</h2>
              <p className="text-3xl font-bold">₨: {balance.toFixed(0)}.00</p>
              <p className="text-blue-100 text-xs mt-1">Available for transactions</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="px-4 mb-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={feature.action}
                className={`${feature.bgColor} rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95`}
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-700">{feature.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        {/* <div className="px-4 mb-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Recent Transactions</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className={`p-3 ${index !== recentTransactions.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      <div className={`${
                        transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {transaction.icon}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{transaction.type}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${
                      transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount}
                    </p>
                    <p className={`text-xs ${
                      transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Transfer/Add Balance Modal */}
      {showTransferPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Add Balance</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Add funds to your account balance</p>
            <input
              type="number"
              placeholder="Enter amount (PKR)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowTransferPopup(false)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBalance}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                Add Balance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
