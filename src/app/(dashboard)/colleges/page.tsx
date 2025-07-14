'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Plus, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { CollegeSearch } from '@/components/college-search'
import { CollegeLogo } from '@/components/ui/college-logo';
import { LucideMapPin, LucideKey, LucideDollarSign, LucideClipboardList, LucidePercentCircle, LucideCheckCircle2, LucideUsers, LucideBadgeDollarSign, LucideBadgePercent } from 'lucide-react';
import { collegeDatabase, CollegeInfo as College } from '@/lib/college-database';
import { Checkbox } from '@/components/ui/checkbox';

const statusOptions = ['All', 'In Progress', 'Applied', 'Accepted', 'Rejected', 'Waitlisted'];

const CollegeCard = ({ college, status, ranking, onUpdateStatus, onDelete, onEdit }: { college: College, status: string, ranking?: string, onUpdateStatus: (name: string, status: string) => void, onDelete: (name: string) => void, onEdit: (college: College) => void }) => {
  return (
    <Card className="p-4 bg-card border border-border rounded-xl shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CollegeLogo collegeName={college.name} size={40} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg truncate">{college.name}</h3>
              {ranking && (
                <Badge variant="outline" className="text-xs">{ranking}</Badge>
              )}
              <Badge className="text-xs bg-blue-900 text-blue-200 ml-2">{status}</Badge>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1 text-sm items-center">
              <span className="flex items-center gap-1"><LucideMapPin className="w-4 h-4 text-pink-500" />{college.location}</span>
              <span className="flex items-center gap-1"><LucideKey className="w-4 h-4 text-yellow-500" />App Fee: {college.appFeeDomestic}</span>
              <span className="flex items-center gap-1"><LucideClipboardList className="w-4 h-4 text-blue-400" />{college.decisionTypes}</span>
              <span className="flex items-center gap-1"><LucidePercentCircle className="w-4 h-4 text-green-500" />{college.freshmanAcceptanceRate}</span>
              <span className="flex items-center gap-1"><LucideCheckCircle2 className="w-4 h-4 text-emerald-500" />{college.testPolicy}</span>
              <span className="flex items-center gap-1"><LucideUsers className="w-4 h-4 text-indigo-500" />{college.undergradPopulation2022}</span>
              <span className="flex items-center gap-1"><LucideBadgeDollarSign className="w-4 h-4 text-orange-500" />In-State: {college.inStateCOA}</span>
              <span className="flex items-center gap-1"><LucideBadgePercent className="w-4 h-4 text-fuchsia-500" />OOS: {college.outOfStateCOA}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Select value={status} onValueChange={(newStatus) => onUpdateStatus(college.name, newStatus)}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.slice(1).map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(college)}>Edit</Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(college.name)}>Delete</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function CollegesPage() {
  // Local state for colleges and their statuses/rankings
  const [colleges, setColleges] = useState<College[]>(collegeDatabase);
  const [statusMap, setStatusMap] = useState<{ [name: string]: string }>({});
  const [rankingMap, setRankingMap] = useState<{ [name: string]: string }>({});
  const [filteredColleges, setFilteredColleges] = useState<College[]>(collegeDatabase);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRanking, setSelectedRanking] = useState('All');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);

  // Select all handler
  const allVisibleCollegeNames = filteredColleges.map(c => c.name);
  const isAllSelected = allVisibleCollegeNames.length > 0 && allVisibleCollegeNames.every(name => selectedColleges.includes(name));
  const isIndeterminate = selectedColleges.length > 0 && !isAllSelected;

  useEffect(() => {
    let currentColleges = colleges;
    if (searchQuery) {
      currentColleges = currentColleges.filter(college =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (college.location && college.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    setFilteredColleges(currentColleges);
  }, [searchQuery, colleges]);

  const handleUpdateStatus = (name: string, status: string) => {
    setStatusMap(prev => ({ ...prev, [name]: status }));
  };

  const handleDeleteCollege = (name: string) => {
    setColleges(prevColleges => prevColleges.filter(college => college.name !== name));
    setFilteredColleges(prevFiltered => prevFiltered.filter(college => college.name !== name));
    setStatusMap(prev => { const copy = { ...prev }; delete copy[name]; return copy; });
    setRankingMap(prev => { const copy = { ...prev }; delete copy[name]; return copy; });
  };

  const handleAddCollege = (newCollege: College) => {
    setColleges(prevColleges => [...prevColleges, newCollege]);
    setFilteredColleges(prevFiltered => [...prevFiltered, newCollege]);
    setShowSearch(false);
  };

  const handleEditCollege = (college: College) => {
    // Placeholder for edit modal
    console.log('Edit college:', college);
  };

  const handleSelectCollege = (name: string, checked: boolean) => {
    setSelectedColleges(prev =>
      checked ? [...prev, name] : prev.filter(n => n !== name)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedColleges(checked ? allVisibleCollegeNames : []);
  };

  const handleDeleteSelected = () => {
    setColleges(prevColleges => prevColleges.filter(college => !selectedColleges.includes(college.name)));
    setFilteredColleges(prevFiltered => prevFiltered.filter(college => !selectedColleges.includes(college.name)));
    setStatusMap(prev => {
      const copy = { ...prev };
      selectedColleges.forEach(name => { delete copy[name]; });
      return copy;
    });
    setRankingMap(prev => {
      const copy = { ...prev };
      selectedColleges.forEach(name => { delete copy[name]; });
      return copy;
    });
    setSelectedColleges([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Colleges</h1>
        <Button onClick={() => setShowSearch(!showSearch)}>
          <Plus className="h-4 w-4 mr-2" />
          Add College
        </Button>
      </div>
      {selectedColleges.length > 0 && (
        <div className="flex items-center gap-4 mb-2">
          <Button variant="destructive" onClick={handleDeleteSelected}>
            Delete Selected ({selectedColleges.length})
          </Button>
        </div>
      )}
      {showSearch && (
        <Card className="p-4 mb-4">
          <h3 className="text-lg font-medium mb-4">Search for a College</h3>
          <CollegeSearch
            onAddCollege={handleAddCollege}
            existingColleges={colleges.map(c => c.name)}
          />
        </Card>
      )}
      {/* Colleges List */}
      <div className="space-y-4">
        {filteredColleges.length === 0 ? (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-medium text-foreground mb-2">
              {colleges.length === 0 ? 'No colleges added yet' : 'No colleges found'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {colleges.length === 0 
                ? 'Start building your college list by adding your first university.'
                : 'Try adjusting your filters to see more colleges.'
              }
            </p>
          </Card>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={isAllSelected ? true : isIndeterminate ? 'indeterminate' : false}
                onCheckedChange={handleSelectAll}
                id="select-all-colleges"
              />
              <label htmlFor="select-all-colleges" className="text-sm select-none cursor-pointer">
                Select All
              </label>
            </div>
            {filteredColleges.map((college) => (
              <div key={college.name} className="flex items-start gap-2">
                <Checkbox
                  checked={selectedColleges.includes(college.name)}
                  onCheckedChange={checked => handleSelectCollege(college.name, !!checked)}
                  id={`select-college-${college.name}`}
                  className="mt-4"
                />
                <div className="flex-1">
                  <CollegeCard
                    college={college}
                    status={statusMap[college.name] || 'In Progress'}
                    ranking={rankingMap[college.name]}
                    onUpdateStatus={handleUpdateStatus}
                    onDelete={handleDeleteCollege}
                    onEdit={handleEditCollege}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
} 