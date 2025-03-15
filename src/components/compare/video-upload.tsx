
import { useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { VideoEncoderService, EncodingProgress } from "@/services/video-encoder";

export function VideoUpload({ onVideoUploaded }: { onVideoUploaded: (videoData: any) => void }) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [encodingProgress, setEncodingProgress] = useState<{ [key: string]: EncodingProgress }>({});
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const processVideo = async () => {
    if (!selectedFile) {
      toast.error("Please select a video file first");
      return;
    }

    setUploading(true);
    setEncodingProgress({});
    
    try {
      // Process the video with our encoder service
      const processedVideo = await VideoEncoderService.encodeVideo(
        selectedFile,
        (progress) => {
          // Update progress for this specific format
          setEncodingProgress(prev => ({
            ...prev,
            [progress.format]: progress
          }));
        }
      );
      
      toast.success("Video processed successfully!");
      onVideoUploaded(processedVideo);
    } catch (error) {
      console.error("Error processing video:", error);
      toast.error("Error processing video. Please try again.");
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  // Calculate overall progress across all formats
  const calculateOverallProgress = () => {
    if (Object.keys(encodingProgress).length === 0) return 0;
    
    const totalProgress = Object.values(encodingProgress).reduce(
      (sum, format) => sum + format.percent, 
      0
    );
    
    return Math.floor(totalProgress / Object.keys(encodingProgress).length);
  };

  // Get the current encoding stage description
  const getCurrentStage = () => {
    const formats = Object.values(encodingProgress);
    if (formats.length === 0) return "Processing video...";
    
    const stages = formats.map(f => f.stage);
    // Find the most common stage
    const stageCounts = stages.reduce((acc, stage) => {
      acc[stage] = (acc[stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const currentStage = Object.entries(stageCounts)
      .sort((a, b) => b[1] - a[1])[0][0];
    
    switch (currentStage) {
      case 'analyzing':
        return "Analyzing video content...";
      case 'encoding':
        return "Encoding video in multiple formats...";
      case 'optimizing':
        return "Optimizing for quality and performance...";
      case 'finalizing':
        return "Finalizing the encoded videos...";
      default:
        return "Processing video...";
    }
  };

  return (
    <div className="bg-card border rounded-lg p-4 mb-4">
      <div className="flex flex-col space-y-4">
        <h2 className="text-lg font-semibold">Upload New Video</h2>
        <p className="text-sm text-muted-foreground">
          Upload a video to compare different encoding methods
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
          <Input 
            type="file" 
            accept="video/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="cursor-pointer"
          />
          <CustomButton
            onClick={processVideo}
            disabled={!selectedFile || uploading}
            className="w-full md:w-auto"
          >
            {uploading ? "Processing..." : "Upload & Process"}
          </CustomButton>
        </div>
        
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{getCurrentStage()}</span>
              <span>{calculateOverallProgress()}%</span>
            </div>
            <Progress value={calculateOverallProgress()} />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              {Object.entries(encodingProgress).map(([format, progress]) => (
                <div key={format} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">
                      {format === 'hls' ? 'HLS' : 
                       format === 'dash' ? 'DASH' : 
                       'Content-Aware'}:
                    </span>
                    <span>{progress.percent}%</span>
                  </div>
                  <Progress value={progress.percent} className="h-1" />
                </div>
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              Converting your video to HLS, DASH, and Content-Aware formats with VMAF quality analysis
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
