export interface QualityMetrics {
  vmaf: number;
  psnr: number;
  ssim: number;
}

// src/types.ts

/**
 * Defines the quality metrics (VMAF, PSNR, SSIM) for a single representation.
 */
export interface QualityMetrics {
  psnr: number;
  ssim: number;
  vmaf: number;
}

/**
 * Defines the metrics for a single encoded video stream (e.g., 1080p, 720p).
 */
export interface RepresentationMetrics {
  width: number;
  height: number;
  crf: number;
  targetBitrateKbps: number;
  actualBitrateKbps: number;
  qualityMetrics: QualityMetrics;
  encodingTimeSeconds: number;
  playlistUrl: string; // Local playlist path from encoding, may be obsolete
}


export interface EncodingResult {
  _id: string;
  jobId: string;
  originalFilename: string;
  inputFileSize: number;
  totalOutputSize: number;
  durationSeconds: number;
  codec: string;
  resolution: {
    width: number;
    height: number;
  };
  frameRate: number;
  opencvMotionScore: number;
  spatialComplexityScore: number;
  sceneChangeCount: number;
  avgSizeReductionPerRep: number;
  maxSizeReduction: number;
  processingTimeSeconds: number;
  s3_master_playlist_url : string,
  createdAt: string;
  completedAt: string;
  updatedAt: string;  
  representation_s3_urls: Record<string, string>;

  // A dictionary of metrics for each representation (e.g., 'rep_1080p')
  representationMetrics: Record<string, RepresentationMetrics>;

  // This property can be added on the frontend for convenience
  hlsUrl?: string;
}


export interface PaginatedResponse<T> {
  total: number;
  page: number;
  perPage: number;
  results: T[];
}


export interface EncodingJob {
  _id: string;
  jobId: string;
  originalFilename: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: number;
  status: 'processing' | 'completed' | 'failed';
  avgSizeReductionPerRep: number;
  inputFileSize: number;
  totalOutputSize: number;
  durationSeconds: number;
  frameRate: number;
  resolution: {
    width: number;
    height: number;
  };
  representationMetrics: Record<string, RepresentationMetrics>;
}

export interface PaginatedResponse<T> {
  page: number;
  perPage: number;
  total: number;
  results: T[];
}

export interface EncodingStatus {
  details: {
    filePath: string;
    id: string;
    originalFilename: string;
    progress: number;
    status: string;
    uploadedAt: number;
  };
  jobId: string;
  status: string;
}