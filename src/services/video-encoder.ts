
import { toast } from "sonner";
import { ApiClient } from "./api-client";

// Types for our encoding service
export interface EncodingFormat {
  name: string;
  url: string;
  metrics: {
    bitrate: string;
    quality: number;
    loadTime: string;
    bandwidth: string;
  };
}

export interface ProcessedVideo {
  id: string;
  name: string;
  size: number;
  formats: {
    hls: EncodingFormat;
    dash: EncodingFormat;
    contentAware: EncodingFormat;
  };
}

export interface EncodingProgress {
  format: string;
  percent: number;
  stage: string;
}

// Main encoding service
export class VideoEncoderService {
  // Encode video using the API client
  static async encodeVideo(
    file: File, 
    onProgress: (progress: EncodingProgress) => void
  ): Promise<ProcessedVideo> {
    try {
      return await ApiClient.uploadAndEncodeVideo(file, onProgress);
    } catch (error) {
      console.error("Error processing video:", error);
      toast.error("Failed to encode video. Please try again later.");
      throw error;
    }
  }
  
  // Get processed videos from the API client
  static async getProcessedVideos(): Promise<ProcessedVideo[]> {
    try {
      return await ApiClient.getProcessedVideos();
    } catch (error) {
      console.error("Error fetching processed videos:", error);
      toast.error("Failed to fetch processed videos. Please try again later.");
      return [];
    }
  }
}
