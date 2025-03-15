
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VideoComparison } from "@/components/compare/video-comparison";
import { MetricsDashboard } from "@/components/compare/metrics-dashboard";
import { ProcessedVideo } from "@/services/video-encoder";

const Compare = () => {
  const [videoData, setVideoData] = useState<ProcessedVideo | null>(null);

  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handler for when a video is uploaded and processed
  const handleVideoProcessed = (data: ProcessedVideo) => {
    setVideoData(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto space-y-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">Encoding Comparison</h1>
            <p className="text-muted-foreground">
              Compare different encoding methods side by side and analyze their performance metrics.
            </p>
          </div>
          
          <VideoComparison onVideoUploaded={handleVideoProcessed} />
          <MetricsDashboard videoData={videoData} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Compare;
