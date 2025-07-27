import React from 'react';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = 'bg-blue-500', 
  height = 8 
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`} style={{ height: `${height}px` }}>
      <div 
        className={`${color} transition-all duration-500 ease-out rounded-full`} 
        style={{ 
          width: `${clampedProgress}%`,
          height: '100%',
          transition: 'width 0.5s ease-out'
        }}
      />
    </div>
  );
};

export default ProgressBar;