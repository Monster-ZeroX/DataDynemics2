import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Student Results Explorer</h1>
              <p className="mt-1 text-sm text-gray-500">Search and view detailed exam results</p>
            </div>
            <div className="hidden sm:flex">
              <svg
                className="h-12 w-12 text-primary-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pb-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 bg-white border-t border-gray-200 mt-10">
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Student Results Explorer</p>
            <p className="text-xs text-gray-400 mt-1">All rights reserved</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
