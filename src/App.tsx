import React from 'react';
import OpportunityCostCalculator from './components/OpportunityCostCalculator';
import './index.css';

function App() {
  return (
    <div className="App min-h-screen">
      <OpportunityCostCalculator />
      
      {/* Optional: Registration Form Section */}
      <div id="registration-form" className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎯 Daftar Webinar Percuma Sekarang!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Pelajari strategi lengkap untuk membeli hartanah pertama anda dengan bijak!
          </p>
          
          {/* Registration Form Placeholder */}
          <form className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              placeholder="Nama Penuh"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <input
              type="tel"
              placeholder="No. Telefon"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="w-full py-4 px-6 text-lg font-bold text-white bg-success hover:bg-green-600 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              DAFTAR SEKARANG - TEMPAT TERHAD!
            </button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            ✅ Webinar Percuma | ✅ Tiada Kos Tersembunyi | ✅ Panduan Langkah Demi Langkah
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-white py-8">
        <p className="text-sm opacity-80">
          © 2025 Opportunity Cost Calculator. Semua hak terpelihara.
        </p>
      </footer>
    </div>
  );
}

export default App;

