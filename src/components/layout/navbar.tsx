
import { Link } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";

export function Navbar() {
  return (
    <header className="fixed w-full top-0 bg-background z-50 border-b">
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="rounded-md bg-primary p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
              <span className="text-xl font-semibold">StreamCompare</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/compare"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Compare
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <CustomButton
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
            >
              Documentation
            </CustomButton>
            <CustomButton size="sm">Get Started</CustomButton>
          </div>
        </div>
      </div>
    </header>
  );
}
