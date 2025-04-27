import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onFocusSearch: () => void;
}

const Dashboard = ({ onFocusSearch }: DashboardProps) => {
  return (
    <div className="mt-10">
      <div className="rounded-lg bg-white shadow px-5 py-6 sm:px-6">
        <div className="text-center py-10">
          <svg 
            className="mx-auto h-48 w-auto text-primary-500"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
            />
          </svg>
          <h2 className="mt-6 text-xl font-medium text-gray-900">Student Results Explorer</h2>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Search for students by name to view their detailed exam results, rankings, and subject scores.
          </p>
          <div className="mt-6">
            <Button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={onFocusSearch}
            >
              Start Searching
              <Search className="ml-2 -mr-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
