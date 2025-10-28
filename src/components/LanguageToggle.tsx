import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage, Language } from '../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang: Language = language === 'en' ? 'ms' : 'en';
    setLanguage(newLang);
  };

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-primary/20"
        aria-label="Toggle Language"
      >
        <span className="text-2xl">🌐</span>
        <div className="flex items-center gap-1">
          <span 
            className={`text-sm font-semibold transition-colors ${
              language === 'en' ? 'text-primary' : 'text-gray-400'
            }`}
          >
            EN
          </span>
          <span className="text-gray-400">/</span>
          <span 
            className={`text-sm font-semibold transition-colors ${
              language === 'ms' ? 'text-primary' : 'text-gray-400'
            }`}
          >
            BM
          </span>
        </div>
      </button>
    </motion.div>
  );
};

export default LanguageToggle;

