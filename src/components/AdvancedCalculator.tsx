import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { formatNumber } from '../utils/formatters';

interface AdvancedCalculatorProps {
  propertyPrice: number;
  downPaymentPercent?: number;
}

interface MortgageCalculation {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principalAmount: number;
}

const AdvancedCalculator: React.FC<AdvancedCalculatorProps> = ({ 
  propertyPrice,
  downPaymentPercent = 10
}) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  // Advanced inputs
  const [interestRate, setInterestRate] = useState(4.5); // Default interest rate %
  const [loanTenure, setLoanTenure] = useState(30); // Default loan tenure in years
  const [customDownPayment, setCustomDownPayment] = useState(downPaymentPercent);
  
  const [mortgage, setMortgage] = useState<MortgageCalculation | null>(null);

  // Calculate mortgage
  useEffect(() => {
    calculateMortgage();
  }, [propertyPrice, interestRate, loanTenure, customDownPayment]);

  const calculateMortgage = () => {
    const downPaymentAmount = propertyPrice * (customDownPayment / 100);
    const loanAmount = propertyPrice - downPaymentAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTenure * 12;

    // Monthly payment formula: M = P * [i(1+i)^n] / [(1+i)^n - 1]
    const monthlyPayment = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    setMortgage({
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      principalAmount: loanAmount
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-6 text-sm font-medium text-primary bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        🧮 {t.advanced.title}
        <span className="text-xs">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Advanced Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-primary/20">
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                💡 {t.advanced.title}
              </h4>

              {/* Input Controls */}
              <div className="space-y-4 mb-6">
                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.advanced.interestRate}: {interestRate}%
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="2"
                      max="10"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg"
                      step="0.1"
                      min="2"
                      max="10"
                    />
                  </div>
                </div>

                {/* Loan Tenure */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.advanced.loanTenure}: {loanTenure} {language === 'en' ? 'years' : 'tahun'}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="5"
                      max="35"
                      step="1"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg"
                      min="5"
                      max="35"
                    />
                  </div>
                </div>

                {/* Down Payment Percentage */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.results.downPayment}: {customDownPayment}%
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="5"
                      value={customDownPayment}
                      onChange={(e) => setCustomDownPayment(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      value={customDownPayment}
                      onChange={(e) => setCustomDownPayment(parseInt(e.target.value))}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg"
                      step="5"
                      min="5"
                      max="50"
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              {mortgage && (
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">{t.results.downPayment}:</span>
                      <span className="text-lg font-bold text-primary">
                        RM {formatNumber(propertyPrice * (customDownPayment / 100))}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {customDownPayment}% {language === 'en' ? 'of property price' : 'dari harga hartanah'}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        {language === 'en' ? 'Loan Amount' : 'Jumlah Pinjaman'}:
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        RM {formatNumber(mortgage.loanAmount)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {100 - customDownPayment}% {language === 'en' ? 'financed' : 'dibiayai'}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 shadow-md border-2 border-success">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">{t.advanced.monthlyPayment}:</span>
                      <span className="text-2xl font-bold text-success">
                        RM {formatNumber(mortgage.monthlyPayment)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {language === 'en' ? 'For' : 'Untuk'} {loanTenure} {language === 'en' ? 'years' : 'tahun'} ({loanTenure * 12} {language === 'en' ? 'months' : 'bulan'})
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        {language === 'en' ? 'Total Payment' : 'Jumlah Bayaran'}:
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        RM {formatNumber(mortgage.totalPayment)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 shadow-md border-2 border-danger/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">{t.advanced.totalInterest}:</span>
                      <span className="text-xl font-bold text-danger">
                        RM {formatNumber(mortgage.totalInterest)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {language === 'en' ? 'Total interest paid over loan period' : 'Jumlah faedah dibayar sepanjang tempoh pinjaman'}
                    </div>
                  </div>

                  {/* Comparison Note */}
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-2 border-warning/30">
                    <p className="text-sm text-gray-700">
                      💡 <strong>{language === 'en' ? 'Note' : 'Nota'}:</strong>{' '}
                      {language === 'en' 
                        ? 'These calculations are estimates. Actual amounts may vary based on bank terms and conditions.'
                        : 'Pengiraan ini adalah anggaran. Jumlah sebenar mungkin berbeza berdasarkan terma dan syarat bank.'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdvancedCalculator;

