import React from 'react';
import { ShieldCheckIcon, DocumentTextIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function TrustAndSafetyPage() {
  return (
    // Removed all dark mode specific classes to keep a consistent light theme
    <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-100">
      <header className="flex items-center mb-6">
        <ShieldCheckIcon className="h-12 w-12 text-blue-600 mr-4" />
        <h1 className="text-3xl font-bold text-gray-900">Trust & Safety in MediGuide Lite</h1>
      </header>

      <p className="mb-8 text-gray-600">
        This section outlines the ethical considerations and design choices made during the development of this educational software demo. Transparency is a core principle.
      </p>

      <div className="space-y-8">
        <section>
          <div className="flex items-center mb-3">
            <DocumentTextIcon className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Strict Educational Disclaimer</h2>
          </div>
          <p className="text-gray-600">
            MediGuide Lite is a **final year project demonstration** only. It is built with *stubbed data* and *rule-based responses* for the purpose of demonstrating full-stack software development principles (React, Flask, APIs, UI/UX).
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-600">
            <li>It does not provide real medical advice, diagnoses, or prescriptions.</li>
            <li>All product information is simulated/stubbed.</li>
            <li>Users are always reminded to consult a healthcare professional.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center mb-3">
            <LockClosedIcon className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Privacy and Data Handling</h2>
          </div>
          <p className="text-gray-600">
            For this local development demo, user inputs (symptoms) are processed locally by the Flask backend and are **not stored** in any database or transmitted externally.
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-600">
            <li>No personal identification information is collected.</li>
            <li>The application does not use any form of user tracking.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
