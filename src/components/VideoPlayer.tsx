import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  hlsUrl: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ hlsUrl, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log("hls",hlsUrl)
    const video = videoRef.current;
    if (!video || !hlsUrl) return;
    
    let hls: Hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(error => console.log('Auto-play prevented:', error));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(error => console.log('Auto-play prevented:', error));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [hlsUrl]); // Re-run effect only when the hlsUrl changes

  return (
    <video
      ref={videoRef}
      className={`w-full ${className}`}
      controls
      playsInline
      preload="auto"
    />
  );
};

export default VideoPlayer;