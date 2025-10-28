import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-16 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 border-2 border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      whileHover={{ rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        key={theme}
        initial={{ rotate: 180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl"
      >
        {isDark ? '🌞' : '🌙'}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;

