import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useSavedCalculations, SavedCalculation } from '../hooks/useSavedCalculations';
import { formatNumber } from '../utils/formatters';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ComparisonMode: React.FC = () => {
  const { t, language } = useLanguage();
  const { savedCalculations } = useSavedCalculations();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCalculations, setSelectedCalculations] = useState<string[]>([]);

  const toggleCalculation = (id: string) => {
    setSelectedCalculations(prev => {
      if (prev.includes(id)) {
        return prev.filter(calcId => calcId !== id);
      } else if (prev.length < 3) { // Max 3 comparisons
        return [...prev, id];
      }
      return prev;
    });
  };

  const getSelectedData = () => {
    return savedCalculations
      .filter(calc => selectedCalculations.includes(calc.id))
      .map((calc, index) => ({
        name: `#${index + 1}`,
        label: `RM ${formatNumber(calc.inputs.monthlyRent)} x ${calc.inputs.monthsRenting}m`,
        rentPaid: calc.results.totalRentPaid,
        opportunityCost: calc.results.opportunityCost,
        equityBuilt: calc.results.equityBuilt,
        ...calc
      }));
  };

  const comparisonData = getSelectedData();

  if (savedCalculations.length < 2) {
    return null; // Need at least 2 saved calculations to compare
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-purple-500/20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="text-2xl">📊</span>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {language === 'en' ? 'Compare' : 'Bandingkan'}
        </span>
      </motion.button>

      {/* Comparison Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed left-0 top-0 bottom-0 w-full md:w-[500px] bg-white dark:bg-gray-900 z-50 shadow-2xl overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-purple-600 text-white p-4 shadow-lg z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">
                    📊 {language === 'en' ? 'Compare Calculations' : 'Bandingkan Kiraan'}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm opacity-90 mt-1">
                  {language === 'en' 
                    ? `Select up to 3 calculations to compare (${selectedCalculations.length}/3 selected)`
                    : `Pilih sehingga 3 kiraan untuk dibandingkan (${selectedCalculations.length}/3 dipilih)`
                  }
                </p>
              </div>

              {/* Selection List */}
              <div className="p-4 space-y-3">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {language === 'en' ? 'Select Calculations:' : 'Pilih Kiraan:'}
                </h4>
                {savedCalculations.map((calc, index) => (
                  <div
                    key={calc.id}
                    onClick={() => toggleCalculation(calc.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                      selectedCalculations.includes(calc.id)
                        ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-500'
                        : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        #{index + 1}
                      </span>
                      <input
                        type="checkbox"
                        checked={selectedCalculations.includes(calc.id)}
                        readOnly
                        className="w-5 h-5 text-purple-600"
                      />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p>💰 {t.input.monthlyRent.label}: RM {formatNumber(calc.inputs.monthlyRent)}</p>
                      <p>📅 {t.input.monthsRenting.label}: {calc.inputs.monthsRenting} {language === 'en' ? 'months' : 'bulan'}</p>
                      <p className="font-medium text-danger">
                        {t.results.opportunityCost}: RM {formatNumber(calc.results.opportunityCost)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison Results */}
              {comparisonData.length >= 2 && (
                <div className="p-4 bg-gray-100 dark:bg-gray-800">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {language === 'en' ? 'Comparison Chart' : 'Carta Perbandingan'}
                  </h4>
                  
                  {/* Chart */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                        <YAxis tick={{ fill: '#6b7280' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number) => `RM ${formatNumber(value)}`}
                        />
                        <Legend />
                        <Bar 
                          dataKey="rentPaid" 
                          fill="#EF4444" 
                          name={t.results.totalRentPaid}
                        />
                        <Bar 
                          dataKey="opportunityCost" 
                          fill="#F59E0B" 
                          name={t.results.opportunityCost}
                        />
                        <Bar 
                          dataKey="equityBuilt" 
                          fill="#10B981" 
                          name={t.results.equityBuilt}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Comparison Table */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 text-gray-700 dark:text-gray-300"></th>
                          {comparisonData.map((_, index) => (
                            <th key={index} className="text-center py-2 text-gray-700 dark:text-gray-300">
                              #{index + 1}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 dark:text-gray-400">
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 font-medium">{t.input.monthlyRent.label}</td>
                          {comparisonData.map((data, index) => (
                            <td key={index} className="text-center py-2">
                              RM {formatNumber(data.inputs.monthlyRent)}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 font-medium">{t.input.monthsRenting.label}</td>
                          {comparisonData.map((data, index) => (
                            <td key={index} className="text-center py-2">
                              {data.inputs.monthsRenting}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 font-medium">{t.results.totalRentPaid}</td>
                          {comparisonData.map((data, index) => (
                            <td key={index} className="text-center py-2 text-danger font-semibold">
                              RM {formatNumber(data.rentPaid)}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 font-medium">{t.results.opportunityCost}</td>
                          {comparisonData.map((data, index) => (
                            <td key={index} className="text-center py-2 text-warning font-semibold">
                              RM {formatNumber(data.opportunityCost)}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Best/Worst Analysis */}
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                      📈 {language === 'en' ? 'Analysis' : 'Analisis'}:
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {language === 'en' 
                        ? `The scenario with RM ${formatNumber(Math.max(...comparisonData.map(d => d.opportunityCost)))} opportunity cost has the highest loss.`
                        : `Senario dengan RM ${formatNumber(Math.max(...comparisonData.map(d => d.opportunityCost)))} kos peluang mempunyai kerugian tertinggi.`
                      }
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ComparisonMode;

