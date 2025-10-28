import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const CTAButton: React.FC = () => {
  const { t } = useLanguage();
  const handleClick = () => {
    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'calculator_cta_click', {
        event_category: 'engagement',
        event_label: 'opportunity_cost_calculator'
      });
    }

    // Scroll to registration form
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
      registrationForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If no registration form found, you can redirect to a registration page
      console.log('Registration form not found. Implement redirect logic here.');
      // window.location.href = '/register';
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="w-full py-5 px-8 text-lg md:text-xl font-bold text-white bg-success hover:bg-green-600 rounded-xl transition-all transform hover:scale-105 shadow-2xl animate-pulse-glow"
    >
      {t.cta.button}
    </button>
  );
};

export default CTAButton;

