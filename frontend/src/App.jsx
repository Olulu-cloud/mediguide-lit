import React, { useState } from 'react';
import Home from './pages/Home'
import SymptomPage from './pages/SymptomPage'
import Shop from './pages/Shop'
import TrustAndSafetyPage from './pages/TrustAndSafetyPage'
import { HashRouter as BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// FIX: Changed XIcon to XMarkIcon
import { HomeIcon, ShoppingCartIcon, ScaleIcon, ShieldCheckIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const NavLink = ({ to, children, Icon }) => (
    <Link 
      to={to} 
      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition duration-150"
      onClick={() => setIsMenuOpen(false)} 
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        {/* Navigation Bar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold text-blue-600">
              MediGuide Lite
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              <NavLink to="/" Icon={HomeIcon}>Home</NavLink>
              <NavLink to="/symptom" Icon={ScaleIcon}>Symptom Check</NavLink>
              <NavLink to="/shop" Icon={ShoppingCartIcon}>Shop</NavLink>
              <NavLink to="/trust" Icon={ShieldCheckIcon}>Trust & Safety</NavLink>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600 hover:text-blue-600">
                {/* FIX: Used XMarkIcon here */}
                {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg border-t">
              <div className="flex flex-col space-y-2 p-4 max-w-6xl mx-auto">
                <NavLink to="/" Icon={HomeIcon}>Home</NavLink>
                <NavLink to="/symptom" Icon={ScaleIcon}>Symptom Check</NavLink>
                <NavLink to="/shop" Icon={ShoppingCartIcon}>Shop</NavLink>
                <NavLink to="/trust" Icon={ShieldCheckIcon}>Trust & Safety</NavLink>
              </div>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptom" element={<SymptomPage />} />
            <Route path="/shop" element={<Shop />} />
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
