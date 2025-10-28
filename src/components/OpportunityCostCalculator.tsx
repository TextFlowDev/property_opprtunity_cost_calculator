import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InputSection from './InputSection';
import ResultsSection from './ResultsSection';
import { calculateOpportunityCost, CalculationResults } from '../utils/calculations';
import { 
  validateMonthlyRent, 
  validateMonthsRenting, 
  validatePropertyPrice 
} from '../utils/validators';

const OpportunityCostCalculator: React.FC = () => {
  // State management
  const [inputs, setInputs] = useState({
    monthlyRent: '',
    monthsRenting: '',
    propertyPrice: ''
  });

  const [errors, setErrors] = useState({
    monthlyRent: '',
    monthsRenting: '',
    propertyPrice: ''
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Validate single input
  const validateInput = (name: string, value: string): boolean => {
    let error = '';
    
    switch(name) {
      case 'monthlyRent':
        error = validateMonthlyRent(value) || '';
        break;
      case 'monthsRenting':
        error = validateMonthsRenting(value) || '';
        break;
      case 'propertyPrice':
        error = validatePropertyPrice(value) || '';
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return !error;
  };

  // Check if all inputs are valid
  const isFormValid = (): boolean => {
    return (
      inputs.monthlyRent !== '' &&
      inputs.monthsRenting !== '' &&
      inputs.propertyPrice !== '' &&
      !errors.monthlyRent &&
      !errors.monthsRenting &&
      !errors.propertyPrice
    );
  };

  // Handle input change
  const handleInputChange = (name: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate after setting
    setTimeout(() => {
      validateInput(name, value);
    }, 0);
  };

  // Handle calculation
  const handleCalculate = () => {
    // Double check validation
    if (!isFormValid()) {
      return;
    }

    // Track analytics - calculation started
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'calculator_started', {
        event_category: 'engagement',
        event_label: 'opportunity_cost_calculator'
      });
    }

    // Set loading state
    setIsCalculating(true);

    // Simulate calculation delay for UX
    setTimeout(() => {
      const calculationResults = calculateOpportunityCost(
        Number(inputs.monthlyRent),
        Number(inputs.monthsRenting),
        Number(inputs.propertyPrice)
      );

      setResults(calculationResults);
      setIsCalculating(false);
      setShowResults(true);

      // Track analytics - calculation completed
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'calculator_completed', {
          event_category: 'engagement',
          event_label: 'opportunity_cost_calculator',
          value: Math.round(calculationResults.opportunityCost)
        });
      }

      // Scroll to results after a brief delay
      setTimeout(() => {
        const resultsElement = document.getElementById('results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }, 800);
  };

  // Handle reset
  const handleReset = () => {
    setInputs({
      monthlyRent: '',
      monthsRenting: '',
      propertyPrice: ''
    });
    setErrors({
      monthlyRent: '',
      monthsRenting: '',
      propertyPrice: ''
    });
    setResults(null);
    setShowResults(false);

    // Track analytics - reset
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'calculator_reset', {
        event_category: 'engagement',
        event_label: 'try_again'
      });
    }

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="opportunity-cost-calculator max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          🔥 Berapa Anda Rugi Dengan Menyewa?
        </h1>
        <p className="text-lg md:text-xl text-white drop-shadow">
          Kira sekarang dan lihat berapa banyak peluang kekayaan yang anda lepaskan!
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <InputSection
          inputs={inputs}
          errors={errors}
          onChange={handleInputChange}
          onCalculate={handleCalculate}
          isCalculating={isCalculating}
          isValid={isFormValid()}
        />
      </motion.div>

      {/* Results Section */}
      {showResults && results && (
        <ResultsSection
          results={results}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default OpportunityCostCalculator;

