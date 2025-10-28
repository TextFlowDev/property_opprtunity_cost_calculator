import React, { createContext, useContext, useState, useEffect } from 'react';

// Language types
export type Language = 'en' | 'ms';

// Translation interface
export interface Translations {
  // Header
  header: {
    title: string;
    subtitle: string;
  };
  // Input Section
  input: {
    monthlyRent: {
      label: string;
      placeholder: string;
    };
    monthsRenting: {
      label: string;
      placeholder: string;
    };
    propertyPrice: {
      label: string;
      placeholder: string;
    };
    calculateButton: string;
    calculating: string;
  };
  // Results Section
  results: {
    mainTitle: string;
    totalRentPaid: string;
    breakdown: string;
    downPayment: string;
    currentValue: string;
    equityBuilt: string;
    opportunityCost: string;
    warning: string;
    futureWarning: string;
    chartTitle: string;
    rentScenario: string;
    buyScenario: string;
    resetButton: string;
  };
  // CTA
  cta: {
    button: string;
  };
  // Validation Errors
  errors: {
    required: string;
    minRent: string;
    maxRent: string;
    minMonths: string;
    maxMonths: string;
    minPrice: string;
    maxPrice: string;
    invalidNumber: string;
  };
  // Registration Form
  registration: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    submitButton: string;
    benefits: string;
  };
  // Footer
  footer: {
    copyright: string;
  };
  // Advanced Calculator
  advanced: {
    title: string;
    interestRate: string;
    loanTenure: string;
    monthlyPayment: string;
    totalInterest: string;
  };
  // Save/Load
  saveLoad: {
    save: string;
    load: string;
    savedCalculations: string;
    noSaved: string;
    delete: string;
  };
}

// English translations
const translationsEN: Translations = {
  header: {
    title: "🔥 How Much Are You Losing By Renting?",
    subtitle: "Calculate now and see how much wealth opportunity you're missing out on!"
  },
  input: {
    monthlyRent: {
      label: "Monthly Rent",
      placeholder: "e.g., 1200"
    },
    monthsRenting: {
      label: "How Long Have You Been Renting?",
      placeholder: "e.g., 24"
    },
    propertyPrice: {
      label: "Typical Property Price in Your Area",
      placeholder: "e.g., 350000"
    },
    calculateButton: "CALCULATE MY LOSS NOW!",
    calculating: "Calculating..."
  },
  results: {
    mainTitle: "Your Total Opportunity Cost:",
    totalRentPaid: "Total Rent Paid",
    breakdown: "Here's What You're Missing:",
    downPayment: "Down Payment (10%)",
    currentValue: "Property Value Now",
    equityBuilt: "Equity Built",
    opportunityCost: "Opportunity Cost",
    warning: "WARNING",
    futureWarning: "Every month you continue renting, you're losing approximately",
    chartTitle: "Rent vs Buy Comparison",
    rentScenario: "Renting (Your Loss)",
    buyScenario: "Buying (Your Gain)",
    resetButton: "Calculate Again With Different Values"
  },
  cta: {
    button: "🚀 LEARN HOW TO BUY YOUR FIRST PROPERTY NOW!"
  },
  errors: {
    required: "This field is required",
    minRent: "Minimum rent is RM 500",
    maxRent: "Maximum rent is RM 10,000",
    minMonths: "Minimum is 1 month",
    maxMonths: "Maximum is 120 months (10 years)",
    minPrice: "Minimum property price is RM 150,000",
    maxPrice: "Maximum property price is RM 1,000,000",
    invalidNumber: "Please enter a valid number"
  },
  registration: {
    title: "🎯 Register For Free Webinar Now!",
    subtitle: "Learn complete strategies to buy your first property wisely!",
    namePlaceholder: "Full Name",
    emailPlaceholder: "Email",
    phonePlaceholder: "Phone Number",
    submitButton: "REGISTER NOW - LIMITED SEATS!",
    benefits: "✅ Free Webinar | ✅ No Hidden Costs | ✅ Step-by-Step Guide"
  },
  footer: {
    copyright: "© 2025 Opportunity Cost Calculator. All rights reserved."
  },
  advanced: {
    title: "Advanced Calculator",
    interestRate: "Interest Rate (%)",
    loanTenure: "Loan Tenure (Years)",
    monthlyPayment: "Monthly Payment",
    totalInterest: "Total Interest"
  },
  saveLoad: {
    save: "Save Calculation",
    load: "Load Saved",
    savedCalculations: "Saved Calculations",
    noSaved: "No saved calculations yet",
    delete: "Delete"
  }
};

// Bahasa Melayu translations
const translationsMS: Translations = {
  header: {
    title: "🔥 Berapa Anda Rugi Dengan Menyewa?",
    subtitle: "Kira sekarang dan lihat berapa banyak peluang kekayaan yang anda lepaskan!"
  },
  input: {
    monthlyRent: {
      label: "Sewa Bulanan",
      placeholder: "contoh: 1200"
    },
    monthsRenting: {
      label: "Sudah Berapa Lama Anda Menyewa?",
      placeholder: "contoh: 24"
    },
    propertyPrice: {
      label: "Harga Hartanah Biasa di Kawasan Anda",
      placeholder: "contoh: 350000"
    },
    calculateButton: "KIRA KERUGIAN SAYA SEKARANG!",
    calculating: "Mengira..."
  },
  results: {
    mainTitle: "Jumlah Kos Peluang Anda:",
    totalRentPaid: "Jumlah Sewa Dibayar",
    breakdown: "Inilah Yang Anda Lepaskan:",
    downPayment: "Wang Pendahuluan (10%)",
    currentValue: "Nilai Hartanah Sekarang",
    equityBuilt: "Ekuiti Terbina",
    opportunityCost: "Kos Peluang",
    warning: "AMARAN",
    futureWarning: "Setiap bulan anda terus menyewa, anda kehilangan kira-kira",
    chartTitle: "Perbandingan Sewa vs Beli",
    rentScenario: "Menyewa (Kerugian Anda)",
    buyScenario: "Membeli (Keuntungan Anda)",
    resetButton: "Kira Semula Dengan Nilai Lain"
  },
  cta: {
    button: "🚀 BELAJAR CARA BELI HARTANAH PERTAMA SEKARANG!"
  },
  errors: {
    required: "Ruangan ini diperlukan",
    minRent: "Sewa minimum adalah RM 500",
    maxRent: "Sewa maksimum adalah RM 10,000",
    minMonths: "Minimum adalah 1 bulan",
    maxMonths: "Maksimum adalah 120 bulan (10 tahun)",
    minPrice: "Harga hartanah minimum adalah RM 150,000",
    maxPrice: "Harga hartanah maksimum adalah RM 1,000,000",
    invalidNumber: "Sila masukkan nombor yang sah"
  },
  registration: {
    title: "🎯 Daftar Webinar Percuma Sekarang!",
    subtitle: "Pelajari strategi lengkap untuk membeli hartanah pertama anda dengan bijak!",
    namePlaceholder: "Nama Penuh",
    emailPlaceholder: "Email",
    phonePlaceholder: "No. Telefon",
    submitButton: "DAFTAR SEKARANG - TEMPAT TERHAD!",
    benefits: "✅ Webinar Percuma | ✅ Tiada Kos Tersembunyi | ✅ Panduan Langkah Demi Langkah"
  },
  footer: {
    copyright: "© 2025 Opportunity Cost Calculator. Semua hak terpelihara."
  },
  advanced: {
    title: "Kalkulator Lanjutan",
    interestRate: "Kadar Faedah (%)",
    loanTenure: "Tempoh Pinjaman (Tahun)",
    monthlyPayment: "Bayaran Bulanan",
    totalInterest: "Jumlah Faedah"
  },
  saveLoad: {
    save: "Simpan Kiraan",
    load: "Muat Simpanan",
    savedCalculations: "Kiraan Tersimpan",
    noSaved: "Tiada kiraan tersimpan lagi",
    delete: "Padam"
  }
};

// Context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get from localStorage or default to Bahasa Melayu
    const saved = localStorage.getItem('preferredLanguage');
    return (saved as Language) || 'ms';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = language === 'en' ? translationsEN : translationsMS;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

