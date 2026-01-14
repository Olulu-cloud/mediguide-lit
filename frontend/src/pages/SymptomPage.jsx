import React, { useState } from 'react';

export default function SymptomPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // Points to your Flask backend on port 5001
      const res = await fetch('http://localhost:5001/api/health/symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: input })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ 
        conditions: ['Error: Backend not reachable'], 
        suggestions: 'Make sure your Python script is running on port 5001.' 
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold text-blue-700">Symptom Checker (Educational)</h2>
      
      <div className="text-sm text-yellow-700 bg-yellow-100 p-3 rounded border border-yellow-200">
        <strong>Disclaimer:</strong> This tool provides educational information only for your 2026 project demo. If you are unwell, consult a healthcare professional.
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe how you feel (e.g., 'I have a headache and a stiff neck')"
          className="w-full border rounded p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
        />
        <div>
          <button 
            className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors" 
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Get Educational Info'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 space-y-4 animate-in fade-in duration-500">
          {/* Conditions Section */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded">
            <h4 className="font-bold text-slate-700 mb-2">Possible Conditions (Educational):</h4>
            <div className="flex flex-wrap gap-2">
              {result.conditions.map((condition, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {condition}
                </span>
              ))}
            </div>
          </div>

          {/* Advice/Suggestions Section */}
          <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded">
            <h4 className="font-bold mb-1">General Advice:</h4>
            <p className="text-sm leading-relaxed">{result.suggestions}</p>
          </div>

          {/* Backend Disclaimer */}
          {result.disclaimer && (
            <div className="text-xs text-gray-500 italic text-center pt-2">
              {result.disclaimer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
