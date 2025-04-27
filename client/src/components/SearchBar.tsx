import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchResults from "./SearchResults";
import { useSearch } from "@/hooks/useSearch";
import { Student } from "@/lib/types";

interface SearchBarProps {
  onSelectStudent: (student: Student) => void;
}

const SearchBar = ({ onSelectStudent }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { results, isLoading, error } = useSearch(query);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show dropdown when input has content
  useEffect(() => {
    setIsOpen(query.length > 0);
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSelectStudent = (student: Student) => {
    onSelectStudent(student);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      clearSearch();
    }
  };

  return (
    <div className="relative mt-4" ref={wrapperRef}>
      <label htmlFor="student-search" className="sr-only">
        Search for students by name
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          id="student-search"
          ref={inputRef}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="block w-full bg-white pl-10 pr-3 py-6 border border-gray-300 rounded-lg shadow-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-base"
          placeholder="Search for students by name (e.g., 'Sandev', 'Malindu')"
          aria-controls="search-results"
          aria-expanded={isOpen}
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <SearchResults
          results={results}
          isLoading={isLoading}
          error={error}
          onSelectStudent={handleSelectStudent}
        />
      )}
    </div>
  );
};

export default SearchBar;
