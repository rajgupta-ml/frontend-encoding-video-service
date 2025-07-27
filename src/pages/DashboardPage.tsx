import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart3, ArrowUpRight, RefreshCw, Download } from 'lucide-react';
import { getEncodingResults } from '../services/api';
import Button from '../components/Button';
import VideoPlayer from '../components/VideoPlayer';
import MetricsCard from '../components/MetricsCard';
import QualityComparisonChart from '../components/QualityComparisonChart';
import BitrateComparisonChart from '../components/BitrateComparisonChart';
import RepresentationTable from '../components/RepresentationTable';
import { EncodingResult } from '../types';

const DashboardPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [results, setResults] = useState<EncodingResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStreamUrl, setCurrentStreamUrl] = useState<string>('');


  useEffect(() => {
    if (!jobId) return;

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = await getEncodingResults(jobId);
        console.log(data);
        setResults(data);
        // Set the initial stream to the master adaptive playlist
        if (data.s3_master_playlist_url) {
          setCurrentStreamUrl(data.s3_master_playlist_url);
        }
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to load encoding results.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [jobId]);

  useEffect(() => {
    console.log("result:",results)
  },[results])

  const handleRefresh = () => {
    if (!jobId) return;
    setIsLoading(true);
    setError(null);
    
    getEncodingResults(jobId)
      .then(data => setResults(data))
      .catch(err => {
        console.error('Error refreshing results:', err);
        setError('Failed to refresh results. Please try again.');
      })
      .finally(() => setIsLoading(false));
  };

  const handleDownloadHLS = () => {
    if (!results) return;
    
    // This would be implemented with a backend endpoint to download the HLS files
    window.open(`/api/download-hls/${jobId}`, '_blank');
  };



  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full p-8">
        <div className="flex flex-col items-center">
          <RefreshCw size={32} className="text-blue-500 animate-spin mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading encoding results...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-8">
        <p className="text-red-500 mb-4">{error || 'Results not found'}</p>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={handleRefresh}>Try Again</Button>
          <Button variant="outline" onClick={() => navigate('/')}>Back to Upload</Button>
        </div>
      </div>
    );
  }

  const allStreams = {
    'Adaptive (Auto)': results.s3_master_playlist_url,
    ...results.representation_s3_urls,
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Encoding Results
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Job ID: {jobId}
          </p>
        </div>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button variant="secondary" onClick={handleDownloadHLS}>
            <Download size={16} className="mr-2" />
            Download HLS
          </Button>
          <Button variant="primary" onClick={() => navigate('/')}>
            <ArrowUpRight size={16} className="mr-2" />
            New Encoding
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Video Preview</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Video Preview</h2>
          <VideoPlayer 
            key={currentStreamUrl} // Use key to force re-render on URL change
            hlsUrl={currentStreamUrl}
            className="w-full aspect-video rounded-lg mb-4"
          />

        <div className="flex flex-wrap gap-2">
            {Object.entries(allStreams).map(([name, url]) => 
            (
              <Button 
              key={name}
              variant={currentStreamUrl === url ? 'primary' : 'outline'}
              size="small"
              onClick={() => setCurrentStreamUrl(url)}
              >
                {name.replace('rep_', '').replace('p', 'p')}
              </Button>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Streaming adaptive bitrate video from AWS S3.
        </p>
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MetricsCard 
            title="Motion Score"
            value={results.opencvMotionScore.toFixed(2)}
            description="Content motion complexity"
            icon={<BarChart3 size={18} />}
            trend={
              results.opencvMotionScore < 0.3 ? 'Low' :
              results.opencvMotionScore < 0.7 ? 'Medium' : 'High'
            }
          />
          
          <MetricsCard 
            title="Spatial Complexity"
            value={results.spatialComplexityScore.toFixed(2)}
            description="Visual detail complexity"
            icon={<BarChart3 size={18} />}
            trend={
              results.spatialComplexityScore < 0.3 ? 'Low' :
              results.spatialComplexityScore < 0.7 ? 'Medium' : 'High'
            }
          />
          
          <MetricsCard 
            title="Scene Changes"
            value={results.sceneChangeCount.toString()}
            description="Number of detected scenes"
            icon={<BarChart3 size={18} />}
          />
          
          <MetricsCard 
            title="Size Reduction"
            value={`${results.avgSizeReductionPerRep.toFixed(1)}%`}
            description="Average file size savings"
            icon={<BarChart3 size={18} />}
            trend={
              results.avgSizeReductionPerRep > 50 ? 'Excellent' :
              results.avgSizeReductionPerRep > 30 ? 'Good' : 'Moderate'
            }
            trendColor={
              results.avgSizeReductionPerRep > 50 ? 'text-green-500' :
              results.avgSizeReductionPerRep > 30 ? 'text-blue-500' : 'text-yellow-500'
            }
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quality Metrics</h2>
          <QualityComparisonChart representations={results.representationMetrics} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Bitrate Comparison</h2>
          <BitrateComparisonChart representations={results.representationMetrics} />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Representation Details</h2>
        <RepresentationTable representations={results.representationMetrics} />
      </div>
    </div>
  );
};

export default DashboardPage;