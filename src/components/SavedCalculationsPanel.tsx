import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useSavedCalculations, SavedCalculation } from '../hooks/useSavedCalculations';
import { formatNumber } from '../utils/formatters';

interface SavedCalculationsPanelProps {
  onLoadCalculation: (calculation: SavedCalculation) => void;
}

const SavedCalculationsPanel: React.FC<SavedCalculationsPanelProps> = ({ onLoadCalculation }) => {
  const { t } = useLanguage();
  const { savedCalculations, deleteCalculation, clearAllCalculations, hasSavedCalculations } = useSavedCalculations();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(t.saveLoad.delete + '?')) {
      deleteCalculation(id);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all saved calculations?')) {
      clearAllCalculations();
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!hasSavedCalculations) {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-primary/20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-2xl">💾</span>
        <span className="text-sm font-semibold text-gray-700">
          {savedCalculations.length}
        </span>
      </motion.button>

      {/* Sliding Panel */}
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
              className="fixed left-0 top-0 bottom-0 w-full md:w-96 bg-white z-50 shadow-2xl overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-primary text-white p-4 shadow-lg z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{t.saveLoad.savedCalculations}</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm opacity-90 mt-1">
                  {savedCalculations.length} calculation{savedCalculations.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Calculations List */}
              <div className="p-4 space-y-3">
                {savedCalculations.map((calculation, index) => (
                  <motion.div
                    key={calculation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-primary"
                    onClick={() => {
                      onLoadCalculation(calculation);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">{formatDate(calculation.timestamp)}</p>
                        <p className="font-semibold text-gray-800 mt-1">
                          {t.input.monthlyRent.label}: RM {formatNumber(calculation.inputs.monthlyRent)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDelete(calculation.id, e)}
                        className="text-danger hover:bg-red-50 rounded-full p-1.5 transition-colors"
                        title={t.saveLoad.delete}
                      >
                        🗑️
                      </button>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{t.input.monthsRenting.label}: {calculation.inputs.monthsRenting} months</p>
                      <p>{t.input.propertyPrice.label}: RM {formatNumber(calculation.inputs.propertyPrice)}</p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700">{t.results.opportunityCost}:</p>
                      <p className="text-lg font-bold text-danger">
                        RM {formatNumber(calculation.results.opportunityCost)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Clear All Button */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                <button
                  onClick={handleClearAll}
                  className="w-full py-3 px-4 text-sm font-medium text-danger bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  Clear All Calculations
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SavedCalculationsPanel;

