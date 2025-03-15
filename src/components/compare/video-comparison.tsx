
import { useState, useRef, useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import { VideoUpload } from "./video-upload";

interface VideoPlayerProps {
  title: string;
  source?: string;
  placeholder?: string;
  encodingMethod: string;
  metrics: {
    bitrate: string;
    quality: number;
    loadTime: string;
    bandwidth: string;
  };
}

const VideoPlayer = ({ title, source, placeholder, encodingMethod, metrics }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-card border rounded-lg overflow-hidden shadow-md h-full flex flex-col">
      <div className="p-3 border-b flex items-center justify-between">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="text-xs px-2 py-0.5 rounded bg-muted hover:bg-muted/80 transition-colors"
          >
            {showMetrics ? "Hide Metrics" : "Show Metrics"}
          </button>
        </div>
      </div>
      
      <div className="relative">
        {source ? (
          <video
            ref={videoRef}
            className="w-full aspect-video bg-black"
            poster={placeholder || ""}
            onClick={togglePlay}
          >
            <source src={source} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        ) : (
          <div className="w-full aspect-video bg-black flex items-center justify-center">
            <div className="text-white/70 text-sm">No video loaded</div>
          </div>
        )}
        
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity",
            isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
        </div>
      </div>
      
      <div className="border-t mt-auto">
        <div className={cn(
          "overflow-hidden transition-all duration-300",
          showMetrics ? "max-h-48" : "max-h-0"
        )}>
          <div className="p-4">
            <h4 className="font-medium text-sm mb-3">Performance Metrics</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-muted rounded p-2">
                <span className="text-muted-foreground">Encoding:</span>
                <p className="font-medium">{encodingMethod}</p>
              </div>
              <div className="bg-muted rounded p-2">
                <span className="text-muted-foreground">Bitrate:</span>
                <p className="font-medium">{metrics.bitrate}</p>
              </div>
              <div className="bg-muted rounded p-2">
                <span className="text-muted-foreground">Quality Score:</span>
                <p className="font-medium">{metrics.quality}/10</p>
              </div>
              <div className="bg-muted rounded p-2">
                <span className="text-muted-foreground">Load Time:</span>
                <p className="font-medium">{metrics.loadTime}</p>
              </div>
              <div className="bg-muted rounded p-2 col-span-2">
                <span className="text-muted-foreground">Bandwidth Usage:</span>
                <p className="font-medium">{metrics.bandwidth}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">{encodingMethod}</div>
          <div className="flex space-x-2">
            <button className="text-xs p-1 rounded hover:bg-muted transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-fullscreen"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>
            </button>
            <button className="text-xs p-1 rounded hover:bg-muted transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function VideoComparison() {
  const [layout, setLayout] = useState<"grid" | "vertical">("grid");
  const [showControls, setShowControls] = useState(true);
  const [videoData, setVideoData] = useState<any>(null);
  
  // Default mock data for demonstration
  const defaultVideos = [
    {
      id: 1,
      title: "Content-Aware Encoding",
      encodingMethod: "Content-Aware (VMAF)",
      metrics: {
        bitrate: "2.5 Mbps (variable)",
        quality: 8.7,
        loadTime: "1.2s",
        bandwidth: "~70% of original"
      }
    },
    {
      id: 2,
      title: "HLS Encoding",
      encodingMethod: "HLS",
      metrics: {
        bitrate: "3.2 Mbps (adaptive)",
        quality: 8.3,
        loadTime: "0.8s",
        bandwidth: "~85% of original"
      }
    },
    {
      id: 3,
      title: "DASH Encoding",
      encodingMethod: "DASH",
      metrics: {
        bitrate: "3.5 Mbps (adaptive)",
        quality: 8.5,
        loadTime: "0.9s",
        bandwidth: "~90% of original"
      }
    }
  ];

  // Videos to display
  const videos = videoData ? [
    {
      id: 1,
      title: "Content-Aware Encoding",
      source: videoData.formats.contentAware.url,
      encodingMethod: "Content-Aware (VMAF)",
      metrics: videoData.formats.contentAware.metrics
    },
    {
      id: 2,
      title: "HLS Encoding",
      source: videoData.formats.hls.url,
      encodingMethod: "HLS",
      metrics: videoData.formats.hls.metrics
    },
    {
      id: 3,
      title: "DASH Encoding",
      source: videoData.formats.dash.url,
      encodingMethod: "DASH",
      metrics: videoData.formats.dash.metrics
    }
  ] : defaultVideos;

  const handleVideoUploaded = (data: any) => {
    setVideoData(data);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <VideoUpload onVideoUploaded={handleVideoUploaded} />
      
      {showControls && (
        <div className="bg-card border rounded-lg p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-lg font-semibold mb-1">Video Comparison</h2>
              <p className="text-sm text-muted-foreground">
                Compare different encoding methods side by side
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Layout:</span>
                <div className="flex border rounded overflow-hidden">
                  <button
                    onClick={() => setLayout("grid")}
                    className={cn(
                      "p-1.5",
                      layout === "grid" ? "bg-accent text-accent-foreground" : "bg-card hover:bg-muted"
                    )}
                    aria-label="Grid layout"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                  </button>
                  <button
                    onClick={() => setLayout("vertical")}
                    className={cn(
                      "p-1.5",
                      layout === "vertical" ? "bg-accent text-accent-foreground" : "bg-card hover:bg-muted"
                    )}
                    aria-label="Vertical layout"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-columns"><rect width="6" height="18" x="3" y="3" rx="1"/><rect width="6" height="18" x="15" y="3" rx="1"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-auto">
        <div className={cn(
          "h-full w-full transition-all duration-300",
          layout === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "space-y-4"
        )}>
          {videos.map((video) => (
            <VideoPlayer
              key={video.id}
              title={video.title}
              source={video.source}
              encodingMethod={video.encodingMethod}
              metrics={video.metrics}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
