import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface InputSectionProps {
  inputs: {
    monthlyRent: string;
    monthsRenting: string;
    propertyPrice: string;
  };
  errors: {
    monthlyRent: string;
    monthsRenting: string;
    propertyPrice: string;
  };
  onChange: (name: string, value: string) => void;
  onCalculate: () => void;
  isCalculating: boolean;
  isValid: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputs,
  errors,
  onChange,
  onCalculate,
  isCalculating,
  isValid
}) => {
  const { t } = useLanguage();
  
  const formatInputValue = (value: string): string => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    // Format with commas
    return numericValue ? new Intl.NumberFormat('en-MY').format(parseInt(numericValue)) : '';
  };

  const handleInputChange = (name: string, value: string) => {
    // Remove commas for storage
    const cleanValue = value.replace(/,/g, '');
    onChange(name, cleanValue);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
      {/* Input Field 1: Monthly Rent */}
      <div className="mb-6">
        <label htmlFor="monthlyRent" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          💰 {t.input.monthlyRent.label} (RM)
        </label>
        <input
          type="text"
          id="monthlyRent"
          name="monthlyRent"
          value={inputs.monthlyRent ? formatInputValue(inputs.monthlyRent) : ''}
          onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
          placeholder={t.input.monthlyRent.placeholder}
          className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none transition-colors dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
            errors.monthlyRent 
              ? 'border-danger focus:border-danger' 
              : 'border-gray-300 dark:border-gray-600 focus:border-primary'
          }`}
        />
        {errors.monthlyRent && (
          <p className="text-sm text-danger mt-1 font-medium">{errors.monthlyRent}</p>
        )}
      </div>

      {/* Input Field 2: Months Renting */}
      <div className="mb-6">
        <label htmlFor="monthsRenting" className="block text-sm font-semibold text-gray-700 mb-2">
          📅 {t.input.monthsRenting.label}
        </label>
        <input
          type="number"
          id="monthsRenting"
          name="monthsRenting"
          value={inputs.monthsRenting}
          onChange={(e) => onChange('monthsRenting', e.target.value)}
          placeholder={t.input.monthsRenting.placeholder}
          min="1"
          max="120"
          className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none transition-colors ${
            errors.monthsRenting 
              ? 'border-danger focus:border-danger' 
              : 'border-gray-300 focus:border-primary'
          }`}
        />
        {errors.monthsRenting && (
          <p className="text-sm text-danger mt-1 font-medium">{errors.monthsRenting}</p>
        )}
      </div>

      {/* Input Field 3: Property Price */}
      <div className="mb-6">
        <label htmlFor="propertyPrice" className="block text-sm font-semibold text-gray-700 mb-2">
          🏠 {t.input.propertyPrice.label} (RM)
        </label>
        <input
          type="text"
          id="propertyPrice"
          name="propertyPrice"
          value={inputs.propertyPrice ? formatInputValue(inputs.propertyPrice) : ''}
          onChange={(e) => handleInputChange('propertyPrice', e.target.value)}
          placeholder={t.input.propertyPrice.placeholder}
          className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none transition-colors ${
            errors.propertyPrice 
              ? 'border-danger focus:border-danger' 
              : 'border-gray-300 focus:border-primary'
          }`}
        />
        {errors.propertyPrice && (
          <p className="text-sm text-danger mt-1 font-medium">{errors.propertyPrice}</p>
        )}
      </div>

      {/* Calculate Button */}
      <button
        onClick={onCalculate}
        disabled={!isValid || isCalculating}
        className={`w-full py-4 px-6 text-lg font-bold rounded-lg transition-all transform shadow-lg ${
          isValid && !isCalculating
            ? 'text-white bg-primary hover:bg-blue-600 hover:scale-105 cursor-pointer'
            : 'text-gray-400 bg-gray-200 cursor-not-allowed opacity-60'
        }`}
      >
        {isCalculating ? (
          <span className="flex items-center justify-center">
            <span className="spinner mr-2"></span>
            {t.input.calculating}
          </span>
        ) : (
          `🔥 ${t.input.calculateButton}`
        )}
      </button>
    </div>
  );
};

export default InputSection;

