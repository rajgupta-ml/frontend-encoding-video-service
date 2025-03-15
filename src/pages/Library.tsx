
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomButton } from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";

interface VideoItemProps {
  title: string;
  date: string;
  duration: string;
  thumbnail?: string;
  encodings: string[];
}

const VideoItem = ({ title, date, duration, thumbnail, encodings }: VideoItemProps) => {
  return (
    <div className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video bg-black relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/40 to-primary/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-1 line-clamp-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{date}</p>
        <div className="flex flex-wrap gap-1">
          {encodings.map((encoding, index) => (
            <span 
              key={index} 
              className="inline-flex text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
            >
              {encoding}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Library = () => {
  const [filter, setFilter] = useState("all");
  
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  // Mock data for demonstration
  const videoLibrary = [
    {
      id: 1,
      title: "Nature Documentary Sample",
      date: "June 15, 2023",
      duration: "2:45",
      encodings: ["Content-Aware", "HLS", "FFmpeg"]
    },
    {
      id: 2,
      title: "Sports Highlight Reel",
      date: "May 22, 2023",
      duration: "1:30",
      encodings: ["Content-Aware", "HLS"]
    },
    {
      id: 3,
      title: "Animation Test Sequence",
      date: "April 18, 2023",
      duration: "0:58",
      encodings: ["Content-Aware", "FFmpeg"]
    },
    {
      id: 4,
      title: "Interview Footage",
      date: "March 5, 2023",
      duration: "5:12",
      encodings: ["HLS", "FFmpeg"]
    },
    {
      id: 5,
      title: "Urban Landscape Timelapse",
      date: "February 27, 2023",
      duration: "1:45",
      encodings: ["Content-Aware", "HLS", "FFmpeg"]
    },
    {
      id: 6,
      title: "Product Demo Video",
      date: "January 19, 2023",
      duration: "3:22",
      encodings: ["Content-Aware", "FFmpeg"]
    },
  ];
  
  const filteredVideos = filter === "all" 
    ? videoLibrary 
    : videoLibrary.filter(video => video.encodings.includes(filter));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Video Library</h1>
              <p className="text-muted-foreground">
                Browse and manage your encoded video collection
              </p>
            </div>
            
            <div className="flex space-x-3">
              <CustomButton variant="outline" size="sm" className="hidden sm:flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
                Refresh
              </CustomButton>
              <CustomButton variant="primary" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                Upload New Video
              </CustomButton>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter by:</span>
                <div className="flex border rounded overflow-hidden">
                  <button
                    onClick={() => setFilter("all")}
                    className={cn(
                      "px-3 py-1 text-sm",
                      filter === "all" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                    )}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("Content-Aware")}
                    className={cn(
                      "px-3 py-1 text-sm",
                      filter === "Content-Aware" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                    )}
                  >
                    Content-Aware
                  </button>
                  <button
                    onClick={() => setFilter("HLS")}
                    className={cn(
                      "px-3 py-1 text-sm",
                      filter === "HLS" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                    )}
                  >
                    HLS
                  </button>
                  <button
                    onClick={() => setFilter("FFmpeg")}
                    className={cn(
                      "px-3 py-1 text-sm",
                      filter === "FFmpeg" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                    )}
                  >
                    FFmpeg
                  </button>
                </div>
              </div>
              
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <input
                  type="search"
                  className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Search videos..."
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <VideoItem
                  key={video.id}
                  title={video.title}
                  date={video.date}
                  duration={video.duration}
                  encodings={video.encodings}
                />
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                </div>
                <h3 className="text-lg font-medium mb-1">No videos found</h3>
                <p className="text-muted-foreground mb-4">
                  No videos matching your filter criteria were found.
                </p>
                <CustomButton 
                  variant="outline" 
                  onClick={() => setFilter("all")}
                >
                  Clear Filters
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Library;
