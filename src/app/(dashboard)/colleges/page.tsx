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
import { Checkbox } from '@/components/ui/checkbox';
import { slugify } from '@/lib/essay-utils';

// Define the College type for user data
interface UserCollege {
  id: string;
  name: string;
  status: string;
  priority: number;
  type: string;
  location?: string;
  applicationSystems?: string;
  appFeeDomestic?: string;
  decisionTypes?: string;
  freshmanAcceptanceRate?: string;
  transferAcceptanceRate?: string;
  testPolicy?: string;
  academicCalendar?: string;
  undergradPopulation2022?: string;
  inStateCOA?: string;
  outOfStateCOA?: string;
  domain?: string;
  admissionsUrl?: string;
  essayUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const statusOptions = ['All', 'In Progress', 'Applied', 'Accepted', 'Rejected', 'Waitlisted'];

const CollegeCard = ({ college, onUpdateStatus, onDelete, onEdit }: { 
  college: UserCollege, 
  onUpdateStatus: (id: string, status: string) => void, 
  onDelete: (id: string) => void, 
  onEdit: (college: UserCollege) => void 
}) => {
  return (
    <Card className="p-4 bg-card border border-border rounded-xl shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CollegeLogo collegeName={college.name} size={40} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Link href={`/college/${slugify(college.name)}`} className="font-semibold text-lg truncate hover:underline">
                {college.name}
              </Link>
              <Badge className="text-xs bg-blue-900 text-blue-200 ml-2">{college.status}</Badge>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1 text-sm items-center">
              {college.location && (
                <span className="flex items-center gap-1"><LucideMapPin className="w-4 h-4 text-pink-500" />{college.location}</span>
              )}
              {college.appFeeDomestic && (
                <span className="flex items-center gap-1"><LucideKey className="w-4 h-4 text-yellow-500" />App Fee: {college.appFeeDomestic}</span>
              )}
              {college.decisionTypes && (
                <span className="flex items-center gap-1"><LucideClipboardList className="w-4 h-4 text-blue-400" />{college.decisionTypes}</span>
              )}
              {college.freshmanAcceptanceRate && (
                <span className="flex items-center gap-1"><LucidePercentCircle className="w-4 h-4 text-green-500" />{college.freshmanAcceptanceRate}</span>
              )}
              {college.testPolicy && (
                <span className="flex items-center gap-1"><LucideCheckCircle2 className="w-4 h-4 text-emerald-500" />{college.testPolicy}</span>
              )}
              {college.undergradPopulation2022 && (
                <span className="flex items-center gap-1"><LucideUsers className="w-4 h-4 text-indigo-500" />{college.undergradPopulation2022}</span>
              )}
              {college.inStateCOA && (
                <span className="flex items-center gap-1"><LucideBadgeDollarSign className="w-4 h-4 text-orange-500" />In-State: {college.inStateCOA}</span>
              )}
              {college.outOfStateCOA && (
                <span className="flex items-center gap-1"><LucideBadgePercent className="w-4 h-4 text-fuchsia-500" />OOS: {college.outOfStateCOA}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Select value={college.status} onValueChange={(newStatus) => onUpdateStatus(college.id, newStatus)}>
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
            <Button variant="outline" size="sm" onClick={() => onDelete(college.id)}>Delete</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function CollegesPage() {
  // State for user's colleges
  const [colleges, setColleges] = useState<UserCollege[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<UserCollege[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's colleges on component mount
  useEffect(() => {
    fetchUserColleges();
  }, []);

  const fetchUserColleges = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/colleges');
      if (response.ok) {
        const userColleges = await response.json();
        setColleges(userColleges);
        setFilteredColleges(userColleges);
      } else {
        console.error('Failed to fetch colleges');
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter colleges based on search and status
  useEffect(() => {
    let currentColleges = colleges;
    
    if (searchQuery) {
      currentColleges = currentColleges.filter(college =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (college.location && college.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedStatus !== 'All') {
      currentColleges = currentColleges.filter(college => college.status === selectedStatus);
    }
    
    setFilteredColleges(currentColleges);
  }, [searchQuery, selectedStatus, colleges]);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/colleges/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        setColleges(prev => prev.map(college => 
          college.id === id ? { ...college, status } : college
        ));
      }
    } catch (error) {
      console.error('Error updating college status:', error);
    }
  };

  const handleDeleteCollege = async (id: string) => {
    try {
      const response = await fetch(`/api/colleges/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setColleges(prev => prev.filter(college => college.id !== id));
        setSelectedColleges(prev => prev.filter(collegeId => collegeId !== id));
      }
    } catch (error) {
      console.error('Error deleting college:', error);
    }
  };

  const handleAddCollege = async (newCollege: any) => {
    try {
      const response = await fetch('/api/colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCollege.name,
          status: 'In Progress',
          type: 'target',
          priority: 1,
          location: newCollege.location || '',
          applicationSystems: newCollege.applicationSystems || '',
          appFeeDomestic: newCollege.appFeeDomestic || '',
          decisionTypes: newCollege.decisionTypes || '',
          freshmanAcceptanceRate: newCollege.freshmanAcceptanceRate || '',
          transferAcceptanceRate: newCollege.transferAcceptanceRate || '',
          testPolicy: newCollege.testPolicy || '',
          academicCalendar: newCollege.academicCalendar || '',
          undergradPopulation2022: newCollege.undergradPopulation2022 || '',
          inStateCOA: newCollege.inStateCOA || '',
          outOfStateCOA: newCollege.outOfStateCOA || '',
          domain: newCollege.domain || '',
          admissionsUrl: newCollege.admissionsUrl || '',
          essayUrl: newCollege.essayUrl || '',
        }),
      });
      
      if (response.ok) {
        const addedCollege = await response.json();
        setColleges(prev => [...prev, addedCollege]);
        setShowSearch(false);
      }
    } catch (error) {
      console.error('Error adding college:', error);
    }
  };

  const handleEditCollege = (college: UserCollege) => {
    // Placeholder for edit modal
    console.log('Edit college:', college);
  };

  const handleSelectCollege = (id: string, checked: boolean) => {
    setSelectedColleges(prev =>
      checked ? [...prev, id] : prev.filter(collegeId => collegeId !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedColleges(checked ? filteredColleges.map(c => c.id) : []);
  };

  const handleDeleteSelected = async () => {
    try {
      // Delete all selected colleges
      await Promise.all(
        selectedColleges.map(id => 
          fetch(`/api/colleges/${id}`, { method: 'DELETE' })
        )
      );
      
      // Remove from local state
      setColleges(prev => prev.filter(college => !selectedColleges.includes(college.id)));
      setSelectedColleges([]);
    } catch (error) {
      console.error('Error deleting selected colleges:', error);
    }
  };

  const isAllSelected = filteredColleges.length > 0 && filteredColleges.every(college => selectedColleges.includes(college.id));
  const isIndeterminate = selectedColleges.length > 0 && !isAllSelected;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your colleges...</p>
        </div>
      </div>
    );
  }

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
      
      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search colleges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Colleges List */}
      <div className="space-y-4">
        {filteredColleges.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {searchQuery || selectedStatus !== 'All' ? 'No colleges match your filters' : 'No colleges added yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedStatus !== 'All' 
                ? 'Try adjusting your search or filters' 
                : 'Start building your college list by adding your first college'
              }
            </p>
            {!searchQuery && selectedStatus === 'All' && (
              <Button onClick={() => setShowSearch(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First College
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Select All Checkbox */}
            <div className="flex items-center space-x-2">
                             <Checkbox
                 id="select-all"
                 checked={isAllSelected}
                 onCheckedChange={handleSelectAll}
               />
              <label htmlFor="select-all" className="text-sm font-medium">
                Select All ({filteredColleges.length})
              </label>
            </div>
            
            {/* College Cards */}
            {filteredColleges.map((college) => (
              <div key={college.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`college-${college.id}`}
                  checked={selectedColleges.includes(college.id)}
                  onCheckedChange={(checked) => handleSelectCollege(college.id, checked as boolean)}
                />
                <div className="flex-1">
                  <CollegeCard
                    college={college}
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