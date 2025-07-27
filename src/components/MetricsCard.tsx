import React, { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  trend?: string;
  trendColor?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendColor = 'text-blue-500'
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
          {title}
        </div>
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-500 dark:text-blue-400">
          {icon}
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
          
          {trend && (
            <div className={`flex items-center text-xs font-medium ${trendColor}`}>
              {trend}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;