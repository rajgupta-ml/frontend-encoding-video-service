import React, { createContext, useState, useContext, ReactNode } from 'react';

interface EncodingContextProps {
  currentJob: string | null;
  setCurrentJob: (jobId: string | null) => void;
}

const EncodingContext = createContext<EncodingContextProps | undefined>(undefined);

export const useEncoding = (): EncodingContextProps => {
  const context = useContext(EncodingContext);
  if (!context) {
    throw new Error('useEncoding must be used within an EncodingProvider');
  }
  return context;
};

interface EncodingProviderProps {
  children: ReactNode;
}

export const EncodingProvider: React.FC<EncodingProviderProps> = ({ children }) => {
  // Try to restore the current job from localStorage
  const savedJobId = localStorage.getItem('current-job-id');
  const [currentJob, setCurrentJobState] = useState<string | null>(savedJobId);

  const setCurrentJob = (jobId: string | null) => {
    setCurrentJobState(jobId);
    
    // Store or remove from localStorage
    if (jobId) {
      localStorage.setItem('current-job-id', jobId);
    } else {
      localStorage.removeItem('current-job-id');
    }
  };

  return (
    <EncodingContext.Provider value={{ currentJob, setCurrentJob }}>
      {children}
    </EncodingContext.Provider>
  );
};