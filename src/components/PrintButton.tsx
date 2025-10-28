import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CalculationResults } from '../utils/calculations';
import { formatNumber } from '../utils/formatters';

interface PrintButtonProps {
  results: CalculationResults;
  inputs: {
    monthlyRent: string;
    monthsRenting: string;
    propertyPrice: string;
  };
}

const PrintButton: React.FC<PrintButtonProps> = ({ results, inputs }) => {
  const { t, language } = useLanguage();

  const handlePrint = () => {
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups for printing');
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${t.header.title}</title>
        <style>
          @media print {
            @page { margin: 2cm; }
            body { margin: 0; }
          }
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #3B82F6;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #3B82F6;
            margin: 0;
            font-size: 28px;
          }
          .header p {
            color: #666;
            margin: 10px 0 0 0;
          }
          .section {
            margin: 20px 0;
            padding: 15px;
            background: #f9fafb;
            border-radius: 8px;
            border-left: 4px solid #3B82F6;
          }
          .section h2 {
            color: #1f2937;
            margin: 0 0 15px 0;
            font-size: 18px;
          }
          .result-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .result-row:last-child {
            border-bottom: none;
          }
          .result-label {
            color: #4b5563;
            font-weight: 500;
          }
          .result-value {
            color: #1f2937;
            font-weight: bold;
          }
          .highlight {
            background: #fee2e2;
            border-left-color: #EF4444;
          }
          .highlight .result-value {
            color: #EF4444;
            font-size: 24px;
          }
          .warning {
            background: #fef3c7;
            border-left-color: #F59E0B;
            margin: 20px 0;
            padding: 15px;
            border-radius: 8px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
          }
          .timestamp {
            text-align: right;
            color: #9ca3af;
            font-size: 12px;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="timestamp">
          ${language === 'en' ? 'Generated on' : 'Dijana pada'}: ${new Date().toLocaleString()}
        </div>

        <div class="header">
          <h1>🏠 ${t.header.title}</h1>
          <p>${t.header.subtitle}</p>
        </div>

        <div class="section">
          <h2>📝 ${language === 'en' ? 'Your Inputs' : 'Input Anda'}</h2>
          <div class="result-row">
            <span class="result-label">${t.input.monthlyRent.label}:</span>
            <span class="result-value">RM ${formatNumber(Number(inputs.monthlyRent))}</span>
          </div>
          <div class="result-row">
            <span class="result-label">${t.input.monthsRenting.label}:</span>
            <span class="result-value">${inputs.monthsRenting} ${language === 'en' ? 'months' : 'bulan'}</span>
          </div>
          <div class="result-row">
            <span class="result-label">${t.input.propertyPrice.label}:</span>
            <span class="result-value">RM ${formatNumber(Number(inputs.propertyPrice))}</span>
          </div>
        </div>

        <div class="section highlight">
          <h2>💸 ${t.results.totalRentPaid}</h2>
          <div class="result-row">
            <span class="result-label"></span>
            <span class="result-value">RM ${formatNumber(results.totalRentPaid)}</span>
          </div>
        </div>

        <div class="section">
          <h2>💡 ${t.results.breakdown}</h2>
          <div class="result-row">
            <span class="result-label">${t.results.downPayment}:</span>
            <span class="result-value">RM ${formatNumber(results.downPaymentAmount)}</span>
          </div>
          <div class="result-row">
            <span class="result-label">${t.results.currentValue}:</span>
            <span class="result-value">RM ${formatNumber(results.currentPropertyValue)}</span>
          </div>
          <div class="result-row">
            <span class="result-label">${t.results.equityBuilt}:</span>
            <span class="result-value">RM ${formatNumber(results.equityBuilt)}</span>
          </div>
        </div>

        <div class="section highlight">
          <h2>🚨 ${t.results.opportunityCost}</h2>
          <div class="result-row">
            <span class="result-label"></span>
            <span class="result-value">RM ${formatNumber(results.opportunityCost)}</span>
          </div>
        </div>

        <div class="warning">
          <strong>⚠️ ${t.results.warning}!</strong><br>
          ${t.results.futureWarning}:<br>
          <strong style="font-size: 18px;">~RM ${formatNumber(results.futureMonthlyLoss)}</strong>
        </div>

        <div class="footer">
          <p>© ${new Date().getFullYear()} ${t.footer.copyright.split(' ').slice(1).join(' ')}</p>
          <p>${language === 'en' ? 'This calculation is for educational purposes only.' : 'Pengiraan ini adalah untuk tujuan pendidikan sahaja.'}</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'print_results', {
        event_category: 'engagement',
        event_label: 'opportunity_cost_calculator'
      });
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="px-8 py-3 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400"
    >
      🖨️ {language === 'en' ? 'Print Results' : 'Cetak Keputusan'}
    </button>
  );
};

export default PrintButton;

