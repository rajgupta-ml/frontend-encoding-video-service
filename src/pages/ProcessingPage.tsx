import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, BarChart2 } from 'lucide-react';
import { useEncoding } from '../context/EncodingContext';
import { getEncodingProgress } from '../services/api';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import ProcessingStage from '../components/ProcessingStage';

const ProcessingPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { currentJob, setCurrentJob } = useEncoding();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Analyzing video content');
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;
    
    // Set current job in context if navigated directly to this page
    if (!currentJob) {
      setCurrentJob(jobId);
    }

    let intervalId: number;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    const fetchProgress = async () => {
      try {
        const data = await getEncodingProgress(jobId);
        
        if (data.status === 'completed') {
          setIsComplete(true);
          setProgress(data.progress)
          setStage("Completed")
          clearInterval(intervalId);
        }else{
          setProgress(data.progress);
          setStage(data.currentStage);

        }
        // Update progress and stage
        
        // Check if encoding is complete
        
        // Reset retry count on successful fetch
        retryCount = 0;
      } catch (err) {
        console.error('Error fetching progress:', err);
        retryCount++;
        
        if (retryCount >= MAX_RETRIES) {
          setError('Unable to fetch progress. Please check your connection and try again.');
          clearInterval(intervalId);
        }
      }
    };

    // Initial fetch
    fetchProgress();
    
    // Set up polling interval (every 2 seconds)
    intervalId = window.setInterval(fetchProgress, 2000);
    
    return () => clearInterval(intervalId);
  }, [jobId, currentJob, setCurrentJob]);

  const handleViewResults = () => {
    navigate(`/dashboard/${jobId}`);
  };

  const getExpectedTimeRemaining = () => {
    // This would be more accurate with backend data
    const totalExpectedTime = 180; // seconds
    const remainingTime = totalExpectedTime * (1 - progress / 100);
    
    if (remainingTime < 60) {
      return `${Math.ceil(remainingTime)} seconds`;
    } else {
      return `${Math.ceil(remainingTime / 60)} minutes`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Processing Video</h1>
      
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
        {error ? (
          <div className="text-center p-6">
            <p className="text-red-500 mb-4">{error}</p>
            <Button variant="secondary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{stage}</h2>
                <span className="text-lg font-medium text-blue-600 dark:text-blue-400">{progress}%</span>
              </div>
              <ProgressBar progress={progress} />
              
              {!isComplete && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Estimated time remaining: {getExpectedTimeRemaining()}
                </p>
              )}
            </div>
            
            <div className="space-y-6">
              <ProcessingStage 
                title="Analyzing video content" 
                description="Detecting motion, scene changes, and spatial complexity"
                isComplete={progress >= 20}
                isActive={progress < 20}
              />
              
              <ProcessingStage 
                title="Determining optimal encoding parameters" 
                description="Setting adaptive bitrates, resolution, and quality targets"
                isComplete={progress >= 40}
                isActive={progress >= 20 && progress < 40}
              />
              
              <ProcessingStage 
                title="Encoding video streams" 
                description="Creating multiple quality levels for adaptive streaming"
                isComplete={progress >= 75}
                isActive={progress >= 40 && progress < 75}
              />
              
              <ProcessingStage 
                title="Generating HLS files" 
                description="Creating manifest files and video segments"
                isComplete={progress >= 90}
                isActive={progress >= 75 && progress < 90}
              />
              
              <ProcessingStage 
                title="Calculating quality metrics" 
                description="Measuring VMAF, PSNR, and SSIM quality scores"
                isComplete={isComplete}
                isActive={progress >= 90 && !isComplete}
              />
            </div>
            
            {isComplete && (
              <div className="mt-8 flex flex-col items-center">
                <p className="text-green-600 dark:text-green-400 text-lg font-medium mb-4">
                  Processing complete! Your video is ready.
                </p>
                <div className="flex gap-4">
                  <Button 
                    variant="primary" 
                    size="large"
                    onClick={handleViewResults}
                  >
                    <Play size={18} className="mr-2" />
                    View Results
                  </Button>
                  <Button 
                    variant="secondary"
                    size="large"
                    onClick={() => navigate('/')}
                  >
                    <BarChart2 size={18} className="mr-2" />
                    Encode Another Video
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProcessingPage;