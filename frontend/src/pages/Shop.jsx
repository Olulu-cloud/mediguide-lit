import React, {useEffect, useState} from 'react'

export default function Shop(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    // Using port 5001 to match your backend
    fetch('https://mediguide-lit.onrender.com/') 
      .then(r => r.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load products", err)
        setLoading(false)
      })
  },[])

  if (loading) return <div className="text-center p-10">Loading catalog...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800">OTC Shop (Demo)</h2>
      <p className="text-sm text-gray-500 mb-4">Educational demonstration of over-the-counter product integration.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(p=>(
          <div key={p.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
            {/* Image display with fallback background */}
            <img 
              src={p.imageUrl} 
              alt={p.name} 
              className="h-24 w-24 object-cover rounded-md bg-slate-100" 
            />

            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">{p.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>
              <div className="mt-3 flex justify-between items-center">
                {/* Formatting price to 2 decimal places */}
                <span className="font-bold text-blue-600">${p.price.toFixed(2)}</span>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          No products found. Ensure the backend is running on port 5001.
        </div>
      )}
    </div>
  )
}
