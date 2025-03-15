
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    return () => {
      if (stepsRef.current) {
        observer.unobserve(stepsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      title: "Upload Your Video",
      description: "Start by uploading your video content to our secure platform. We accept most standard formats including MP4, MOV, and AVI.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
      )
    },
    {
      title: "Select Encoding Methods",
      description: "Choose which encoding methods to compare from our available options: Content-Aware Encoding, HLS, and FFmpeg with custom parameters.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-checks"><path d="m3 7 3 3 3-3"/><path d="M6 10V5"/><line x1="12" x2="20" y1="7" y2="7"/><line x1="12" x2="20" y1="17" y2="17"/><path d="m3 17 3 3 3-3"/><path d="M6 20v-5"/></svg>
      )
    },
    {
      title: "Processing",
      description: "Our system processes your video through each selected encoding method, applying optimal settings and collecting performance data.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cog"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m7 20.66 1-1.73"/></svg>
      )
    },
    {
      title: "Compare Results",
      description: "View side-by-side comparisons of your video with detailed metrics for each encoding method, including quality, bitrate, and performance.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-compare"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-accent">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            StreamCompare makes it easy to analyze and compare different video encoding methods in just a few simple steps.
          </p>
        </div>

        <div 
          ref={stepsRef}
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border z-0">
              <div 
                className="absolute top-0 w-0.5 bg-primary transition-all duration-700" 
                style={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="relative z-10 space-y-16 md:space-y-24">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "transition-all duration-500",
                    activeStep === index ? "opacity-100" : "opacity-50",
                    "md:grid md:grid-cols-2 md:gap-8 md:items-center"
                  )}
                >
                  <div className={cn(
                    "flex flex-col items-center md:items-end text-center md:text-right",
                    index % 2 !== 0 && "md:order-2"
                  )}>
                    <div className="mb-4 flex flex-col items-center md:items-end">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors",
                        activeStep === index ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      )}>
                        {step.icon}
                      </div>
                      <span className="text-sm text-muted-foreground">Step {index + 1}</span>
                      <h3 className="text-xl font-semibold mt-2">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground max-w-md">{step.description}</p>
                  </div>

                  <div className={cn(
                    "mt-6 md:mt-0 flex justify-center",
                    index % 2 !== 0 && "md:order-1"
                  )}>
                    <div className={cn(
                      "bg-card border rounded-xl overflow-hidden shadow-lg w-full max-w-md aspect-video",
                      activeStep === index ? "animate-scale-in" : ""
                    )}>
                      <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 p-8">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 text-primary/80">
                            {step.icon}
                          </div>
                          <p className="text-sm font-medium">{step.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step indicator dots */}
        <div className="flex justify-center space-x-2 mt-12">
          {steps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                activeStep === index ? "bg-primary" : "bg-muted"
              )}
              onClick={() => setActiveStep(index)}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
