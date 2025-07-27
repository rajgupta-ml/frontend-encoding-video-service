import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface ProcessingStageProps {
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
}

const ProcessingStage: React.FC<ProcessingStageProps> = ({
  title,
  description,
  isComplete,
  isActive,
}) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
        {isComplete ? (
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        ) : isActive ? (
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
        ) : (
          <Circle className="h-6 w-6 text-gray-300 dark:text-gray-600" />
        )}
      </div>
      <div className="ml-4 flex-1">
        <h3 className={`text-lg font-medium ${
          isComplete ? 'text-green-600 dark:text-green-400' : 
          isActive ? 'text-blue-600 dark:text-blue-400' : 
          'text-gray-500 dark:text-gray-400'
        }`}>
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProcessingStage;