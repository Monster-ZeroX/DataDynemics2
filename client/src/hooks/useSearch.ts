import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Student } from "@/lib/types";

export function useSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce the search query to avoid too many API requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return [] as Student[];
      const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json() as Promise<Student[]>;
    },
    enabled: debouncedQuery.trim().length > 0,
  });

  return {
    results: data || [],
    isLoading,
    error,
  };
}
