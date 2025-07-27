import { EncodingResult, EncodingJob, PaginatedResponse, EncodingStatus } from '../types';

// Base API URL (replace with your actual API endpoint)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.rajgupta.in/encode/api';

// Helper function for making API requests
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error (${response.status}): ${errorText}`);
  }

  return response.json();
};

// File upload with progress tracking
export const uploadVideo = async (file: File): Promise<{ jobId: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/videos`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed (${response.status}): ${errorText}`);
  }
  
  return response.json();
};

// Get encoding job progress
export const getEncodingProgress = async (jobId: string): Promise<{
  progress: number;
  status: 'processing' | 'completed' | 'failed';
  currentStage: string;
}> => {
  const response = await apiRequest<EncodingStatus>(`/videos/${jobId}/status`);
  
  return {
    progress: response.details.progress,
    status: response.status as 'processing' | 'completed' | 'failed',
    currentStage: getStageFromProgress(response.details.progress)
  };
};

// Helper function to determine the current stage based on progress
const getStageFromProgress = (progress: number): string => {
  if (progress < 20) return 'Analyzing video content';
  if (progress < 40) return 'Determining optimal encoding parameters';
  if (progress < 75) return 'Encoding video streams';
  if (progress < 90) return 'Generating HLS files';
  return 'Calculating quality metrics';
};


export const getEncodingResults = async (jobId: string): Promise<EncodingResult> => {
  return apiRequest<EncodingResult>(`/videos/${jobId}/results`);
};
// Get job history with pagination
export const getJobHistory = async (page = 1, limit = 10): Promise<PaginatedResponse<EncodingJob>> => {
  return apiRequest(`/videos/history?page=${page}&limit=${limit}`);
};

// Cancel an encoding job
export const cancelJob = async (jobId: string): Promise<void> => {
  await apiRequest(`/videos/${jobId}/cancel`, { method: 'POST' });
};

// Delete an encoding job
export const deleteJob = async (jobId: string): Promise<void> => {
  await apiRequest(`/videos/${jobId}/delete`, { method: 'DELETE' });
};

// Get system statistics
export const getSystemStats = async (): Promise<{
  totalJobs: number;
  activeJobs: number;
  averageProcessingTime: number;
  cpuUsage: number;
  memoryUsage: number;
}> => {
  return apiRequest('/stats');
};