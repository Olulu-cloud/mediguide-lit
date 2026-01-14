import React from 'react'
import { Link } from 'react-router-dom'
// Make sure you have installed these: npm install @heroicons/react
import { CheckCircleIcon, ShoppingCartIcon, ScaleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function Home(){
  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white p-10 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to MediGuide Lite</h1>
        <p className="text-blue-100 mb-6">Your educational resource for health information and over-the-counter products. Prepare for your final year project with a hands-on approach to software development.</p>
        <Link to="/symptom" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition duration-150">
          Start Symptom Check
        </Link>
      </div>

      {/* Features Section - Now all cards are clickable links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Symptom Analysis Link */}
        <Link to="/symptom" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 block">
          <ScaleIcon className="h-10 w-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Symptom Analysis</h3>
          <p className="text-gray-600">Use our tool to get general educational information based on your described symptoms.</p>
        </Link>
        
        {/* OTC Shop Link */}
        <Link to="/shop" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 block">
          <ShoppingCartIcon className="h-10 w-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">OTC Shop</h3>
          <p className="text-gray-600">Browse a wide variety of educational over-the-counter product demos with images and prices.</p>
        </Link>
        
        {/* Trust & Safety (Now a clickable Link) */}
        <Link to="/trust" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 block">
          <ShieldCheckIcon className="h-10 w-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
          <p className="text-gray-600">Built with privacy and educational disclaimers in mind, following best practices.</p>
        </Link>
        
      </div>

      {/* Disclaimer/Info Section */}
      <div className="text-center p-6 bg-gray-100 rounded-lg">
        <CheckCircleIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
        <p className="text-sm text-gray-700">Remember: This is an educational demo only. Always consult a healthcare professional for actual medical advice.</p>
      </div>
    </div>
  )
}
