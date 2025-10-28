import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';
import ComparisonChart from './ComparisonChart';
import CTAButton from './CTAButton';
import { formatNumber } from '../utils/formatters';
import { CalculationResults } from '../utils/calculations';

interface ResultsSectionProps {
  results: CalculationResults;
  onReset: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, onReset }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      id="results-section"
      className="mt-12 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Total Rent Paid - Big Red Number */}
      <motion.div 
        className="text-center py-8 px-6 bg-red-50 border-4 border-danger rounded-xl"
        variants={itemVariants}
      >
        <h3 className="text-xl md:text-2xl font-medium text-gray-700 mb-4">
          💸 Jumlah Wang 'Terbakar' Untuk Sewa
        </h3>
        <div className="text-5xl md:text-7xl font-bold text-danger font-mono">
          <AnimatedNumber
            value={results.totalRentPaid}
            duration={1500}
            prefix="RM "
            suffix=".00"
          />
        </div>
        <p className="mt-4 text-gray-600 text-lg">
          Wang ini tidak akan kembali kepada anda!
        </p>
      </motion.div>

      {/* Opportunity Cost Breakdown */}
      <motion.div 
        className="bg-white p-6 md:p-8 rounded-xl shadow-lg"
        variants={itemVariants}
      >
        <h4 className="text-xl font-bold text-gray-800 mb-6">
          💡 Jika wang ini jadi down payment untuk rumah RM {formatNumber(results.inputs.propertyPrice)}:
        </h4>
        
        <div className="space-y-4">
          <motion.div 
            className="flex flex-col md:flex-row md:justify-between md:items-center py-3 border-b border-gray-200"
            variants={itemVariants}
          >
            <span className="text-gray-700 font-medium mb-1 md:mb-0">Down payment diperlukan:</span>
            <div className="text-right">
              <span className="text-xl font-bold text-primary">RM {formatNumber(results.downPaymentAmount)}</span>
              <p className="text-sm text-gray-500">(10% dari harga rumah)</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row md:justify-between md:items-center py-3 border-b border-gray-200"
            variants={itemVariants}
          >
            <span className="text-gray-700 font-medium mb-1 md:mb-0">Nilai property hari ini:</span>
            <div className="text-right">
              <span className="text-xl font-bold text-success">RM {formatNumber(results.currentPropertyValue)}</span>
              <p className="text-sm text-gray-500">(dengan 10% appreciation per tahun)</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row md:justify-between md:items-center py-3 border-b border-gray-200"
            variants={itemVariants}
          >
            <span className="text-gray-700 font-medium mb-1 md:mb-0">Equity yang anda boleh ada:</span>
            <span className="text-xl font-bold text-success">RM {formatNumber(results.equityBuilt)}</span>
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row md:justify-between md:items-center py-4 px-4 bg-red-50 rounded-lg border-2 border-danger mt-4"
            variants={itemVariants}
          >
            <span className="text-gray-800 font-bold text-lg mb-2 md:mb-0">🚨 JUMLAH KERUGIAN PELUANG:</span>
            <span className="text-2xl md:text-3xl font-bold text-danger">RM {formatNumber(results.opportunityCost)}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Future Projection */}
      <motion.div 
        className="p-6 bg-gradient-to-r from-warning to-danger text-white rounded-xl text-center shadow-lg"
        variants={itemVariants}
        animate={{ 
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <p className="text-xl md:text-2xl font-bold mb-2">
          ⚠️ PERHATIAN! ⚠️
        </p>
        <p className="text-lg md:text-xl">
          Setiap 30 hari anda tangguh keputusan = <br />
          <span className="text-2xl md:text-3xl font-bold">
            RUGI PELUANG ~RM {formatNumber(results.futureMonthlyLoss)}!
          </span>
        </p>
      </motion.div>

      {/* Comparison Chart */}
      <motion.div variants={itemVariants}>
        <ComparisonChart
          rentScenario={results.totalRentPaid}
          buyScenario={results.equityBuilt}
          monthsRenting={results.inputs.monthsRenting}
        />
      </motion.div>

      {/* CTA Button */}
      <motion.div variants={itemVariants}>
        <CTAButton />
      </motion.div>

      {/* Reset Button */}
      <motion.div variants={itemVariants} className="text-center">
        <button 
          onClick={onReset} 
          className="w-full md:w-auto px-8 py-3 text-base font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          🔄 Kira Semula Dengan Nilai Lain
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ResultsSection;

