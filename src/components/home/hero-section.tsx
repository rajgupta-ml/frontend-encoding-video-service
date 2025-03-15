
import { useState, useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-primary/5"></div>
      </div>
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className={cn(
            "transition-all duration-700 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="inline-flex items-center justify-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span>Introducing StreamCompare</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text">
              Compare Video Encoding <br /> Methods with Precision
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Analyze and compare Content-Aware Encoding, HLS, and FFmpeg streaming performance with our advanced metrics and visual tools.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <CustomButton 
                variant="primary" 
                size="lg"
                className="min-w-[180px] font-medium"
                onClick={() => navigate("/compare")}
              >
                Start Comparing
              </CustomButton>
              
              <CustomButton 
                variant="outline" 
                size="lg"
                className="min-w-[180px] font-medium"
                onClick={() => navigate("/library")}
              >
                View Library
              </CustomButton>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
        <div 
          className={cn(
            "mt-16 md:mt-20 relative rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="aspect-[16/9] bg-gradient-to-br from-primary/90 to-primary/60 rounded-xl relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-4xl px-4">
                <div className="bg-background/95 backdrop-blur shadow-lg rounded-lg overflow-hidden">
                  <div className="h-10 bg-muted/40 border-b flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x">
                    <div className="p-4 aspect-video flex items-center justify-center bg-black/80">
                      <div className="text-white text-xs">Content-Aware Encoding</div>
                    </div>
                    <div className="p-4 aspect-video flex items-center justify-center bg-black/80">
                      <div className="text-white text-xs">HLS Encoding</div>
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="h-2 bg-primary/20 rounded-full w-full"></div>
                        <div className="h-2 bg-primary/20 rounded-full w-3/4"></div>
                        <div className="h-2 bg-primary/20 rounded-full w-1/2"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-primary/20 rounded-full w-full"></div>
                        <div className="h-2 bg-primary/20 rounded-full w-3/4"></div>
                        <div className="h-2 bg-primary/20 rounded-full w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
