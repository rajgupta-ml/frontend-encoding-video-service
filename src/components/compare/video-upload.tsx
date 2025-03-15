
import { useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function VideoUpload({ onVideoUploaded }: { onVideoUploaded: (videoData: any) => void }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadVideo = async () => {
    if (!selectedFile) {
      toast.error("Please select a video file first");
      return;
    }

    setUploading(true);
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 300);

    try {
      // Simulate API call for processing
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        
        // Mock response data
        const mockVideoData = {
          id: "video-" + Date.now(),
          name: selectedFile.name,
          size: selectedFile.size,
          formats: {
            hls: {
              url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
              metrics: {
                bitrate: "3.2 Mbps (adaptive)",
                quality: 8.3,
                loadTime: "0.8s",
                bandwidth: "~85% of original"
              }
            },
            dash: {
              url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
              metrics: {
                bitrate: "3.5 Mbps (adaptive)",
                quality: 8.5,
                loadTime: "0.9s",
                bandwidth: "~90% of original"
              }
            },
            contentAware: {
              url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
              metrics: {
                bitrate: "2.5 Mbps (variable)",
                quality: 8.7,
                loadTime: "1.2s",
                bandwidth: "~70% of original"
              }
            }
          }
        };
        
        toast.success("Video uploaded and processed successfully!");
        onVideoUploaded(mockVideoData);
        setUploading(false);
        setSelectedFile(null);
      }, 3000);
    } catch (error) {
      toast.error("Error uploading video");
      setUploading(false);
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
            onClick={uploadVideo}
            disabled={!selectedFile || uploading}
            className="w-full md:w-auto"
          >
            {uploading ? "Processing..." : "Upload & Process"}
          </CustomButton>
        </div>
        
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing video...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground">
              Converting your video to HLS, DASH, and Content-Aware formats
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
