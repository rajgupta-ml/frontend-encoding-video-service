
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function FeaturesSection() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.feature-item');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible && !visibleSections.includes(index)) {
          setVisibleSections(prev => [...prev, index]);
        }
      });
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  const features = [
    {
      title: "Content-Aware Encoding",
      description: "Optimize streaming quality by analyzing content and adjusting encoding parameters in real-time based on complexity and movement.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"/><path d="M16 8V5c0-1.1.9-2 2-2"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/><path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/><path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/><path d="M18.5 4a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/></svg>
      )
    },
    {
      title: "HLS Streaming",
      description: "Test HTTP Live Streaming (HLS) with adaptive bitrate capabilities for seamless playback across varying network conditions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-signal-high"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg>
      )
    },
    {
      title: "FFmpeg Encoding",
      description: "Utilize the industry-standard FFmpeg toolkit with custom parameters and presets for complete control over encoding.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
      )
    },
    {
      title: "Side-by-Side Comparison",
      description: "Compare multiple encoding methods simultaneously with our intuitive side-by-side viewer and detailed metrics analysis.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-columns"><rect width="6" height="18" x="3" y="3" rx="1"/><rect width="6" height="18" x="15" y="3" rx="1"/></svg>
      )
    },
    {
      title: "Performance Metrics",
      description: "Analyze key performance indicators such as bitrate efficiency, quality scores, load time, and bandwidth usage.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-3"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
      )
    },
    {
      title: "Export Reports",
      description: "Generate comprehensive reports with visualizations and data tables to document encoding performance comparisons.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-bar-chart"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-4"/><path d="M8 18v-2"/><path d="M16 18v-6"/></svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform provides powerful tools to evaluate and compare different video encoding methods with precision and ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "feature-item bg-card border rounded-xl p-6 transition-all duration-700 transform",
                visibleSections.includes(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
