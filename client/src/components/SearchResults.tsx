import { useEffect, useRef, useState } from "react";
import { Loader } from "lucide-react";
import { Student } from "@/lib/types";

interface SearchResultsProps {
  results: Student[];
  isLoading: boolean;
  error: Error | null;
  onSelectStudent: (student: Student) => void;
}

const SearchResults = ({ results, isLoading, error, onSelectStudent }: SearchResultsProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const resultsRef = useRef<HTMLDivElement>(null);
  const resultItemsRef = useRef<Array<HTMLDivElement | null>>([]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!results.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(prev => {
          const newIndex = prev < results.length - 1 ? prev + 1 : prev;
          resultItemsRef.current[newIndex]?.focus();
          return newIndex;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : 0;
          resultItemsRef.current[newIndex]?.focus();
          return newIndex;
        });
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault();
        onSelectStudent(results[focusedIndex]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [results, focusedIndex, onSelectStudent]);

  // Reset focused index when results change
  useEffect(() => {
    setFocusedIndex(-1);
    resultItemsRef.current = resultItemsRef.current.slice(0, results.length);
  }, [results]);

  return (
    <div 
      id="search-results" 
      ref={resultsRef}
      className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm"
      role="listbox"
    >
      {/* Loading State */}
      {isLoading && (
        <div className="px-4 py-3 text-center text-gray-500 text-sm">
          <Loader className="animate-spin h-5 w-5 mx-auto" />
          <p className="mt-2">Searching...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="px-4 py-3 text-center text-red-500 text-sm">
          <p>Error: {error.message}</p>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && !error && results.length === 0 && (
        <div className="px-4 py-10 text-center text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-1 text-sm text-gray-500">No students found. Try a different search term.</p>
        </div>
      )}

      {/* Results List */}
      {!isLoading && 
        results.map((student, index) => (
          <div
            key={student["Index Number"]}
            ref={el => (resultItemsRef.current[index] = el)}
            className="cursor-pointer select-none relative py-3 pl-3 pr-9 hover:bg-primary-50 focus:bg-primary-100"
            role="option"
            tabIndex={0}
            onClick={() => onSelectStudent(student)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectStudent(student);
              }
            }}
          >
            <div className="flex items-start">
              <span className="text-primary-700 font-medium truncate">{student.Name}</span>
              <span className="ml-auto text-xs text-gray-500 truncate pr-4">
                {student["Index Number"]}
              </span>
            </div>
            <div className="flex mt-1">
              {student["Z-Score"] !== "-" && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                  Z-Score: {student["Z-Score"]}
                </span>
              )}
              {student["Island Rank"] !== "-" && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  Rank: {student["Island Rank"]}
                </span>
              )}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default SearchResults;
