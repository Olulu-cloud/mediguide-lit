import React from 'react'
import Home from './pages/Home'
import SymptomPage from './pages/SymptomPage'
import Shop from './pages/Shop'
// Import the new Trust and Safety page component
import TrustAndSafetyPage from './pages/TrustAndSafetyPage' 
import { HashRouter as BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// Import necessary icons from Heroicons (make sure these are installed)
import { HomeIcon, ShoppingCartIcon, ScaleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        {/* Navigation Bar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold text-blue-600">
              MediGuide Lite
            </div>
            <nav className="flex space-x-4">
              <Link to="/" className="flex items-center space-x-1 hover:text-blue-600">
                <HomeIcon className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link to="/symptom" className="flex items-center space-x-1 hover:text-blue-600">
                <ScaleIcon className="h-5 w-5" />
                <span>Symptom Check</span>
              </Link>
              <Link to="/shop" className="flex items-center space-x-1 hover:text-blue-600">
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Shop</span>
              </Link>
              {/* Added link to the new Trust & Safety page in the header navigation */}
              <Link to="/trust" className="flex items-center space-x-1 hover:text-blue-600">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>Trust & Safety</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptom" element={<SymptomPage />} />
            <Route path="/shop" element={<Shop />} />
            {/* Add the route for the new Trust and Safety page */}
            <Route path="/trust" element={<TrustAndSafetyPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="mt-12 py-4 text-center text-gray-500 text-xs border-t">
            Educational information only. Not a substitute for professional medical advice.
        </footer>
      </div>
    </BrowserRouter>
  )
}
