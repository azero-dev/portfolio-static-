'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PagefindSearchResult {
  id: string;
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta: {
      title?: string;
      description?: string;
      tags?: string[];
    };
  }>;
}

interface PagefindSearchResponse {
  results: PagefindSearchResult[];
}

interface PagefindModule {
  search: (query: string) => Promise<PagefindSearchResponse>;
  preload?: (query: string) => Promise<void>;
}

declare global {
  interface Window {
    pagefind?: PagefindModule;
  }
}

interface ProcessedSearchResult {
  id: string;
  data: {
    url: string;
    excerpt: string;
    meta: {
      title?: string;
      description?: string;
      tags?: string[];
    };
  };
}

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProcessedSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Initialize pagefind
  useEffect(() => {
    const initPagefind = async () => {
      if (typeof window === 'undefined' || window.pagefind) return;
      try {
        // @ts-ignore
        const pagefind = await import('/pagefind/pagefind.js' /* @vite-ignore */);
        window.pagefind = pagefind;
        // Optionally run init if required by new pagefind versions
        if (typeof pagefind.init === 'function') {
          await pagefind.init();
        }
      } catch (error) {
        console.warn('Pagefind script not found. Search is disabled (ensure you run a build first).', error);
      }
    };

    initPagefind();
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || !window.pagefind) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const search = await window.pagefind.search(searchQuery);
      const results = await Promise.all(
        search.results.slice(0, 10).map(async (result: PagefindSearchResult) => ({
          id: result.id,
          data: await result.data(),
        }))
      );
      setResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search blog posts..."
          className="pl-10 pr-10 font-mono"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim()) {
              handleSearch(e.target.value);
              setIsOpen(true);
            } else {
              setResults([]);
              setIsOpen(false);
            }
          }}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            onClick={handleClear}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </form>

      {/* Search results dropdown */}
      {isOpen && (query.trim() || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-muted-foreground font-mono">Searching...</div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-border">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={result.data.url}
                  className="block p-4 hover:bg-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <h3 className="font-semibold text-foreground mb-1">
                    {result.data.meta.title || 'Untitled'}
                  </h3>
                  {result.data.meta.description && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {result.data.meta.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {result.data.excerpt}
                  </p>
                </a>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-4 text-center text-muted-foreground font-mono">
              No results found for &quot;{query}&quot;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
