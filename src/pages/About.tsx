
import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto space-y-12">
          <section>
            <h1 className="text-4xl font-bold mb-4">About StreamCompare</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A platform dedicated to comparing and analyzing different video encoding methods
              for optimal streaming performance.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                StreamCompare was created to help content creators, streaming platforms, and video
                professionals make informed decisions about their encoding strategies. We believe
                that the right encoding method can significantly impact user experience, bandwidth
                costs, and overall video quality.
              </p>
              <p className="text-muted-foreground">
                Our platform provides side-by-side comparisons of different encoding methods,
                allowing you to visualize differences in quality, analyze performance metrics,
                and determine the best approach for your specific content needs.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-8">
              <div className="aspect-video bg-black/40 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60"><path d="M12 2s8 5 8 10c0 5-8 10-8 10-8 0-8-15 0-20Z"/><path d="M12 12v8"/><path d="M12 12a4 4 0 0 0 0-8"/></svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Why Encoding Matters</h3>
              <p className="text-sm text-muted-foreground">
                Effective video encoding balances quality and file size, directly impacting streaming 
                performance, bandwidth usage, and the viewer experience. The right encoding method 
                can reduce costs while maintaining quality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Encoding Methods We Compare</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Content-Aware Encoding</h3>
                <p className="text-muted-foreground mb-4">
                  Content-Aware Encoding analyzes your video content to apply optimal encoding settings
                  based on the specific characteristics of each scene. This results in better quality
                  at lower bitrates for complex scenes while using less bandwidth for simpler content.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Adapts to scene complexity</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Variable bitrate based on content</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Optimized for perceptual quality</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><line x1="2" x2="22" y1="20" y2="20"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">HLS (HTTP Live Streaming)</h3>
                <p className="text-muted-foreground mb-4">
                  HLS is an adaptive streaming protocol developed by Apple that works by breaking 
                  the overall stream into a sequence of small HTTP-based file downloads. It allows 
                  the stream to adapt to the viewer's available bandwidth conditions.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Adaptive bitrate streaming</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Wide device compatibility</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Reliable across varying networks</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 16V8"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">FFmpeg Standard</h3>
                <p className="text-muted-foreground mb-4">
                  FFmpeg is a powerful multimedia framework that can be used to encode, decode, 
                  transcode, and stream audio and video. It offers a wide range of compression 
                  options and codecs for different use cases.
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Highly customizable parameters</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Support for multiple codecs</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Industry-standard encoding solution</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-accent p-8 rounded-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to compare encoding methods?</h2>
              <p className="text-muted-foreground mb-6">
                Upload your video and see the difference between Content-Aware Encoding, HLS, and FFmpeg 
                with side-by-side comparisons and detailed performance metrics.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild>
                  <Link to="/compare">Try the Comparison Tool</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">Learn More</Link>
                </Button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Technical Specifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Metrics We Analyze</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Processing Time</h4>
                      <p className="text-sm text-muted-foreground">How long each method takes to encode your video.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9"/><path d="M18 2V8H12V2Z"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">File Size</h4>
                      <p className="text-sm text-muted-foreground">Resulting file size after encoding is complete.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Bitrate</h4>
                      <p className="text-sm text-muted-foreground">Data rate at which video is encoded, affecting quality and size.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m4 21 16-8L4 5v16Z"/></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Playback Performance</h4>
                      <p className="text-sm text-muted-foreground">Startup time, buffering frequency, and playback smoothness.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4">Supported File Formats</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["MP4", "MOV", "AVI", "MKV", "WEBM", "FLV"].map((format) => (
                    <div key={format} className="bg-muted rounded-md p-3 text-center">
                      <span className="font-mono text-sm">.{format.toLowerCase()}</span>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-medium mt-6 mb-4">Resolution Support</h3>
                <div className="space-y-2">
                  {[
                    { name: "HD 720p", res: "1280 × 720" },
                    { name: "Full HD 1080p", res: "1920 × 1080" },
                    { name: "4K Ultra HD", res: "3840 × 2160" }
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-2 border-b">
                      <span>{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
