import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Search, RefreshCw } from 'lucide-react';
import { getJobHistory } from '../services/api';
import Button from '../components/Button';
import { EncodingJob, PaginatedResponse } from '../types';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [paginationData, setPaginationData] = useState<PaginatedResponse<EncodingJob>>({
    page: 1,
    perPage: 10,
    total: 0,
    results: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getJobHistory();
      setPaginationData(data);
    } catch (err) {
      console.error('Error fetching job history:', err);
      setError('Failed to load job history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewJob = (jobId: string) => {
    navigate(`/dashboard/${jobId}`);
  };

  const filteredJobs = paginationData.results.filter(job => {
    const filename = job.originalFilename || '';
    return filename.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getJobStatus = (job: EncodingJob): 'completed' | 'processing' | 'failed' => {
    if (job.completedAt) return 'completed';
    return 'processing';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Encoding History</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Total Jobs: {paginationData.total}
          </p>
        </div>
        
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Button variant="outline" onClick={fetchJobs}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button variant="primary" onClick={() => navigate('/')}>
            Encode New Video
          </Button>
        </div>
      </div>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search by filename..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-8">
          <RefreshCw size={24} className="text-blue-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center p-8">
          <p className="text-red-500 mb-4">{error}</p>
          <Button variant="secondary" onClick={fetchJobs}>
            Try Again
          </Button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          {filteredJobs.length === 0 ? (
            <div className="text-center p-8">
              <Clock size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                No encoding jobs found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm ? 'No results match your search' : 'Start by encoding your first video'}
              </p>
              {searchTerm ? (
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              ) : (
                <Button variant="primary" onClick={() => navigate('/')}>
                  Encode a Video
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Video File
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Size Reduction
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredJobs.map((job) => (
                    <tr key={job.jobId} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {job.originalFilename}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {job.jobId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{formatDate(job.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${getJobStatus(job) === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                            getJobStatus(job) === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                          {getJobStatus(job)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {job.avgSizeReductionPerRep ? `${job.avgSizeReductionPerRep.toFixed(1)}%` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="outline" 
                          size="small"
                          onClick={() => handleViewJob(job.jobId)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;