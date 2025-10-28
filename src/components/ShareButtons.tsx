import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { formatNumber } from '../utils/formatters';
import { CalculationResults } from '../utils/calculations';

interface ShareButtonsProps {
  results: CalculationResults;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ results }) => {
  const { t, language } = useLanguage();

  // Generate share messages
  const generateShareMessage = () => {
    const opportunityCost = formatNumber(results.opportunityCost);
    const totalRent = formatNumber(results.totalRentPaid);
    
    if (language === 'en') {
      return `💸 I just calculated my renting opportunity cost!\n\n` +
             `Total rent paid: RM ${totalRent}\n` +
             `Opportunity cost: RM ${opportunityCost}\n\n` +
             `How much are YOU losing by renting? Calculate now! 👇`;
    } else {
      return `💸 Saya baru kira kos peluang sewa saya!\n\n` +
             `Jumlah sewa dibayar: RM ${totalRent}\n` +
             `Kos peluang: RM ${opportunityCost}\n\n` +
             `Berapa ANDA rugi dengan menyewa? Kira sekarang! 👇`;
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareMessage = generateShareMessage();

  // Share handlers
  const shareToWhatsApp = () => {
    const text = encodeURIComponent(shareMessage + '\n' + shareUrl);
    const whatsappUrl = `https://wa.me/?text=${text}`;
    window.open(whatsappUrl, '_blank');
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: 'WhatsApp',
        content_type: 'calculation_result'
      });
    }
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMessage)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: 'Facebook',
        content_type: 'calculation_result'
      });
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: 'Twitter',
        content_type: 'calculation_result'
      });
    }
  };

  const shareToTelegram = () => {
    const text = encodeURIComponent(shareMessage + '\n' + shareUrl);
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`;
    window.open(telegramUrl, '_blank');
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: 'Telegram',
        content_type: 'calculation_result'
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage + '\n' + shareUrl);
      alert(language === 'en' ? 'Copied to clipboard!' : 'Disalin ke papan keratan!');
      
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'share', {
          method: 'Copy Link',
          content_type: 'calculation_result'
        });
      }
    } catch (error) {
      console.error('Failed to copy:', error);
      alert(language === 'en' ? 'Failed to copy' : 'Gagal menyalin');
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
        📢 {language === 'en' ? 'Share Your Results' : 'Kongsi Keputusan Anda'}
      </h4>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* WhatsApp */}
        <motion.button
          onClick={shareToWhatsApp}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white hover:bg-green-50 rounded-lg transition-all transform hover:scale-105 shadow-md border-2 border-transparent hover:border-green-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-3xl">📱</div>
          <span className="text-xs font-medium text-gray-700">WhatsApp</span>
        </motion.button>

        {/* Facebook */}
        <motion.button
          onClick={shareToFacebook}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white hover:bg-blue-50 rounded-lg transition-all transform hover:scale-105 shadow-md border-2 border-transparent hover:border-blue-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-3xl">👥</div>
          <span className="text-xs font-medium text-gray-700">Facebook</span>
        </motion.button>

        {/* Twitter */}
        <motion.button
          onClick={shareToTwitter}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white hover:bg-sky-50 rounded-lg transition-all transform hover:scale-105 shadow-md border-2 border-transparent hover:border-sky-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-3xl">🐦</div>
          <span className="text-xs font-medium text-gray-700">Twitter</span>
        </motion.button>

        {/* Telegram */}
        <motion.button
          onClick={shareToTelegram}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white hover:bg-cyan-50 rounded-lg transition-all transform hover:scale-105 shadow-md border-2 border-transparent hover:border-cyan-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-3xl">✈️</div>
          <span className="text-xs font-medium text-gray-700">Telegram</span>
        </motion.button>

        {/* Copy Link */}
        <motion.button
          onClick={copyToClipboard}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white hover:bg-gray-50 rounded-lg transition-all transform hover:scale-105 shadow-md border-2 border-transparent hover:border-gray-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-3xl">📋</div>
          <span className="text-xs font-medium text-gray-700">
            {language === 'en' ? 'Copy' : 'Salin'}
          </span>
        </motion.button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        {language === 'en' 
          ? 'Help others discover their opportunity cost!' 
          : 'Bantu orang lain mengetahui kos peluang mereka!'}
      </p>
    </motion.div>
  );
};

export default ShareButtons;

