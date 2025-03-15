
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CustomButton } from "@/components/ui/custom-button";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: "Library", path: "/library" },
    { name: "About", path: "/about" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out px-4 md:px-8",
        isScrolled
          ? "bg-background/80 backdrop-blur border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 transition-opacity hover:opacity-80"
            >
              <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="absolute bg-background w-3 h-3 rounded-full"></span>
              </div>
              <span className="font-semibold text-lg tracking-tight">StreamCompare</span>
            </Link>
          </div>

          {!isMobile && (
            <nav className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors",
                    location.pathname === link.path
                      ? "text-primary font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-2">
            <CustomButton
              variant="primary"
              size="sm"
              className="hidden sm:flex items-center"
            >
              Upload Video
            </CustomButton>

            {isMobile && (
              <CustomButton
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {mobileMenuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="4" y1="8" x2="20" y2="8" />
                      <line x1="4" y1="16" x2="20" y2="16" />
                    </>
                  )}
                </svg>
              </CustomButton>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobile && mobileMenuOpen && (
          <div className="absolute top-16 inset-x-0 bg-background/95 backdrop-blur-sm border-b animate-slide-down">
            <div className="py-2 px-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    location.pathname === link.path
                      ? "text-primary bg-accent/50"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <CustomButton
                  variant="primary"
                  size="default"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Upload Video
                </CustomButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
