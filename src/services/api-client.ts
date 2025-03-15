
import axios from 'axios';
import { ProcessedVideo, EncodingProgress } from "./video-encoder";

// API client for connecting to our video encoding service
export class ApiClient {
  // Base URL for API endpoints - you may need to update this with your actual encoding service
  private static baseUrl = "https://video-encoding-api.example.com/api";
  
  // Upload and encode a video
  static async uploadAndEncodeVideo(
    file: File,
    onProgress: (progress: EncodingProgress) => void
  ): Promise<ProcessedVideo> {
    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('video', file);
      
      // Upload the file first
      const uploadResponse = await axios.post(`${this.baseUrl}/videos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
          // Report upload progress
          onProgress({
            format: 'upload',
            percent: percentCompleted,
            stage: 'uploading'
          });
        }
      });
      
      const videoId = uploadResponse.data.videoId;
      
      // Start the encoding process
      const encodingResponse = await axios.post(`${this.baseUrl}/videos/${videoId}/encode`, {
        formats: ['hls', 'dash', 'contentAware']
      });
      
      // Poll for encoding status until complete
      const encodedVideo = await this.pollEncodingStatus(videoId, onProgress);
      
      return encodedVideo;
    } catch (error) {
      console.error('Error in upload and encode:', error);
      throw new Error('Failed to upload and encode video. Please try again later.');
    }
  }
  
  // Poll the encoding status until complete
  private static async pollEncodingStatus(
    videoId: string,
    onProgress: (progress: EncodingProgress) => void
  ): Promise<ProcessedVideo> {
    let isComplete = false;
    
    while (!isComplete) {
      try {
        const statusResponse = await axios.get(`${this.baseUrl}/videos/${videoId}/status`);
        const status = statusResponse.data;
        
        // Update progress for each format
        if (status.hls) {
          onProgress({
            format: 'hls',
            percent: status.hls.progress,
            stage: status.hls.stage
          });
        }
        
        if (status.dash) {
          onProgress({
            format: 'dash',
            percent: status.dash.progress,
            stage: status.dash.stage
          });
        }
        
        if (status.contentAware) {
          onProgress({
            format: 'contentAware',
            percent: status.contentAware.progress,
            stage: status.contentAware.stage
          });
        }
        
        isComplete = status.isComplete;
        
        if (isComplete) {
          return status.processedVideo;
        }
        
        // Wait before polling again
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error polling encoding status:', error);
        throw new Error('Error checking encoding status. Please try again later.');
      }
    }
    
    throw new Error('Encoding process did not complete properly');
  }
  
  // Get processed videos from the backend
  static async getProcessedVideos(): Promise<ProcessedVideo[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/videos/processed`);
      return response.data;
    } catch (error) {
      console.error('Error fetching processed videos:', error);
      throw new Error('Failed to fetch processed videos. Please try again later.');
    }
  }
}
