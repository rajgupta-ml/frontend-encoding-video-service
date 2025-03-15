
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t py-8 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <span className="absolute bg-background w-2 h-2 rounded-full"></span>
              </div>
              <span className="font-semibold tracking-tight">StreamCompare</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              An advanced streaming platform for comparing different video encoding methods: Content-Aware Encoding, HLS, and FFmpeg. Analyze performance, quality, and efficiency metrics.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-sm tracking-wide text-muted-foreground">Platform</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-foreground/80 hover:text-primary transition-colors">Home</Link>
              <Link to="/compare" className="text-sm text-foreground/80 hover:text-primary transition-colors">Compare</Link>
              <Link to="/library" className="text-sm text-foreground/80 hover:text-primary transition-colors">Library</Link>
              <Link to="/about" className="text-sm text-foreground/80 hover:text-primary transition-colors">About</Link>
            </nav>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-sm tracking-wide text-muted-foreground">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/docs" className="text-sm text-foreground/80 hover:text-primary transition-colors">Documentation</Link>
              <Link to="/api" className="text-sm text-foreground/80 hover:text-primary transition-colors">API</Link>
              <Link to="/faq" className="text-sm text-foreground/80 hover:text-primary transition-colors">FAQ</Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/80 hover:text-primary transition-colors">GitHub</a>
            </nav>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} StreamCompare. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
