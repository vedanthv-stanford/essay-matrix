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

// Types
interface College {
  id: string;
  name: string;
  status: string;
  location: string;
  type: string;
  acceptanceRate: number;
  tuition: number;
  enrollment: number;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

const statusOptions = ['All', 'In Progress', 'Applied', 'Accepted', 'Rejected', 'Waitlisted'];

const CollegeCard = ({ college, onUpdateStatus, onDelete, onEdit }: { 
  college: College, 
  onUpdateStatus: (id: string, status: string) => void, 
  onDelete: (id: string) => void, 
  onEdit: (college: College) => void 
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-600">
              {college.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{college.name}</h3>
            <p className="text-sm text-gray-600">{college.location}</p>
            <Badge variant="secondary" className="text-xs">
              {college.status}
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={college.status} onValueChange={(status) => onUpdateStatus(college.id, status)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.slice(1).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => onEdit(college)}>
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(college.id)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showSearch, setShowSearch] = useState(false);

  // Fetch colleges from database
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/colleges');
        if (response.ok) {
          const data = await response.json();
          setColleges(data);
        } else {
          console.error('Failed to fetch colleges');
        }
      } catch (error) {
        console.error('Error fetching colleges:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchColleges();
  }, []);

  useEffect(() => {
    filterColleges();
  }, [colleges, statusFilter]);

  const filterColleges = () => {
    if (statusFilter === 'All') {
      setFilteredColleges(colleges);
    } else {
      setFilteredColleges(colleges.filter(college => college.status === statusFilter));
    }
  };

  const handleAddCollege = async (collegeData: any) => {
    try {
      const response = await fetch('/api/colleges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collegeData),
      });

      if (response.ok) {
        const newCollege = await response.json();
        setColleges(prev => [...prev, newCollege]);
        setShowSearch(false);
      } else {
        console.error('Failed to add college');
      }
    } catch (error) {
      console.error('Error adding college:', error);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/colleges/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setColleges(prev => 
          prev.map(college => 
            college.id === id 
              ? { ...college, status, updatedAt: new Date().toISOString() }
              : college
          )
        );
      } else {
        console.error('Failed to update college status');
      }
    } catch (error) {
      console.error('Error updating college status:', error);
    }
  };

  const handleDeleteCollege = async (id: string) => {
    if (!confirm('Are you sure you want to delete this college?')) return;
    
    try {
      const response = await fetch(`/api/colleges/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setColleges(prev => prev.filter(college => college.id !== id));
      } else {
        console.error('Failed to delete college');
      }
    } catch (error) {
      console.error('Error deleting college:', error);
    }
  };

  const handleEditCollege = (college: College) => {
    // TODO: Implement edit modal
    console.log('Edit college:', college);
  };

  const getStatusCounts = () => {
    const counts: { [key: string]: number } = {};
    statusOptions.forEach(status => {
      if (status === 'All') return;
      counts[status] = colleges.filter(college => college.status === status).length;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome, Ved!</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading colleges...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome, Ved!</h1>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Writing essays is about to get a lot easier. Let&apos;s get started:
        </h2>
        <ol className="space-y-2 text-sm">
          <li>1. Check out the <Link href="/background" className="text-blue-400 underline hover:text-blue-300">Background</Link> tab. Spend 5 minutes reflecting there.</li>
          <li>2. Add your first college below. Click on its name to view the essay questions.</li>
          <li>3. Use Barca to generate ideas, and then write your first rough draft.</li>
        </ol>
      </div>

      {/* College Search */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Colleges</h2>
          <Button onClick={() => setShowSearch(!showSearch)}>
            <Plus className="h-4 w-4 mr-2" />
            Add College
          </Button>
        </div>

        {showSearch && (
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Search for a College</h3>
            <CollegeSearch
              onAddCollege={handleAddCollege}
              existingColleges={colleges.map(c => c.name)}
            />
          </Card>
        )}
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statusOptions.slice(1).map((status) => (
          <Card key={status} className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts[status] || 0}</div>
            <div className="text-sm text-gray-600">{status}</div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Filter by status:</span>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status} {status !== 'All' && `(${statusCounts[status] || 0})`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Colleges List */}
      <div className="space-y-4">
        {filteredColleges.length === 0 ? (
          <Card className="p-8 text-center">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {colleges.length === 0 ? 'No colleges added yet' : 'No colleges match your filter'}
            </h3>
            <p className="text-gray-600 mb-4">
              {colleges.length === 0 
                ? 'Start building your college list by adding your first university.'
                : 'Try adjusting your filters to see more colleges.'
              }
            </p>
            {colleges.length === 0 && (
              <Button onClick={() => setShowSearch(true)}>
                Add Your First College
              </Button>
            )}
          </Card>
        ) : (
          filteredColleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteCollege}
              onEdit={handleEditCollege}
            />
          ))
        )}
      </div>
    </div>
  );
} 