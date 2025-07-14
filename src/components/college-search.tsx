'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { collegeDatabase, CollegeInfo } from '@/lib/college-database';

interface CollegeSearchProps {
  onAddCollege: (college: CollegeInfo) => void;
  existingColleges: string[];
}

export function CollegeSearch({ onAddCollege, existingColleges }: CollegeSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CollegeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }
    setIsLoading(true);
    // Use the new collegeDatabase for suggestions
    const filtered = collegeDatabase.filter(college =>
      college.name.toLowerCase().includes(query.toLowerCase()) ||
      college.location.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
    setResults(filtered);
    setShowResults(true);
    setIsLoading(false);
  }, [query]);

  const handleAddCollege = (college: CollegeInfo) => {
    onAddCollege(college);
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for a university..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
          onFocus={() => query.trim().length >= 2 && setShowResults(true)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto shadow-lg">
          <div className="p-2">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">Searching...</div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                {query.trim().length >= 2 ? 'No colleges found' : 'Start typing to search...'}
              </div>
            ) : (
              <div className="space-y-1">
                {results.map((college, index) => {
                  const isAlreadyAdded = existingColleges.includes(college.name);
                  return (
                    <div
                      key={index}
                      className={cn(
                        'p-3 rounded-lg border cursor-pointer transition-colors',
                        isAlreadyAdded
                          ? 'bg-muted/50 border-border cursor-not-allowed'
                          : 'hover:bg-accent border-transparent'
                      )}
                      onClick={() => !isAlreadyAdded && handleAddCollege(college)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm text-foreground">{college.name}</h4>
                            {isAlreadyAdded && (
                              <Badge variant="secondary" className="text-xs">
                                Added
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{college.location}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>App Fee: {college.appFee}</span>
                            <span>Acceptance: {college.freshmanAcceptanceRate}</span>
                            <span>Pop: {college.undergradPopulation}</span>
                          </div>
                        </div>
                        {!isAlreadyAdded && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="ml-2 h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddCollege(college);
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
} 