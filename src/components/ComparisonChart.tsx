import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatNumber } from '../utils/formatters';
import { useLanguage } from '../context/LanguageContext';

interface ComparisonChartProps {
  rentScenario: number;
  buyScenario: number;
  monthsRenting: number;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ 
  rentScenario, 
  buyScenario,
  monthsRenting 
}) => {
  const { t } = useLanguage();
  
  const data = [
    {
      name: t.results.rentScenario,
      wealth: -rentScenario, // Negative to show loss
      displayValue: rentScenario
    },
    {
      name: t.results.buyScenario,
      wealth: buyScenario,
      displayValue: buyScenario
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isNegative = data.wealth < 0;
      
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-gray-200">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className={`text-lg font-bold ${isNegative ? 'text-danger' : 'text-success'}`}>
            {isNegative ? '- ' : '+ '}RM {formatNumber(data.displayValue)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container bg-white p-6 rounded-xl shadow-lg">
      <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
        {t.results.chartTitle}
      </h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#374151', fontWeight: 500 }}
          />
          <YAxis 
            tick={{ fill: '#6b7280' }}
            tickFormatter={(value) => `${value >= 0 ? '+' : '-'}RM ${formatNumber(Math.abs(value))}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="wealth" 
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.wealth < 0 ? '#EF4444' : '#10B981'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 bg-danger rounded mr-2"></div>
          <span className="text-gray-600">{t.results.rentScenario}</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 bg-success rounded mr-2"></div>
          <span className="text-gray-600">{t.results.buyScenario}</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;

