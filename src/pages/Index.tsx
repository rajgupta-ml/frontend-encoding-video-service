
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { CustomButton } from "@/components/ui/custom-button";

const Index = () => {
  useEffect(() => {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        
        {/* Call to action section */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Compare Encoding Methods?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Upload your video and see the difference between Content-Aware, HLS, and DASH encoding techniques.
            </p>
            <Link to="/compare">
              <CustomButton size="lg">
                Go to Comparison Tool
              </CustomButton>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
