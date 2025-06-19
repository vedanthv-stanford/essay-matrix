'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CollegeSearch } from '@/components/college-search';
import { CollegeCard } from '@/components/college-card';
import { Plus, GraduationCap, Filter } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface College {
  id: string;
  name: string;
  status: string;
  location?: string;
  type?: string;
  acceptanceRate?: number;
  tuition?: number;
  enrollment?: number;
  priority?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const statusOptions = ['All', 'In Progress', 'Applied', 'Accepted', 'Rejected', 'Waitlisted'];

// Mock data for demo purposes
const mockColleges: College[] = [
  {
    id: '1',
    name: 'Stanford University',
    status: 'In Progress',
    location: 'Stanford, CA',
    type: 'Private',
    acceptanceRate: 4.3,
    tuition: 56169,
    enrollment: 17000,
    priority: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'University of California, Berkeley',
    status: 'Applied',
    location: 'Berkeley, CA',
    type: 'Public',
    acceptanceRate: 14.4,
    tuition: 44115,
    enrollment: 42000,
    priority: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Massachusetts Institute of Technology',
    status: 'In Progress',
    location: 'Cambridge, MA',
    type: 'Private',
    acceptanceRate: 6.7,
    tuition: 57786,
    enrollment: 11500,
    priority: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>(mockColleges);
  const [filteredColleges, setFilteredColleges] = useState<College[]>(mockColleges);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showSearch, setShowSearch] = useState(false);

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
    const newCollege: College = {
      id: Date.now().toString(),
      name: collegeData.name,
      location: collegeData.location,
      type: collegeData.type,
      acceptanceRate: collegeData.acceptanceRate,
      tuition: collegeData.tuition,
      enrollment: collegeData.enrollment,
      status: 'In Progress',
      priority: colleges.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setColleges(prev => [...prev, newCollege]);
    setShowSearch(false);
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setColleges(prev => 
      prev.map(college => 
        college.id === id 
          ? { ...college, status, updatedAt: new Date().toISOString() }
          : college
      )
    );
  };

  const handleDeleteCollege = async (id: string) => {
    if (!confirm('Are you sure you want to delete this college?')) return;
    setColleges(prev => prev.filter(college => college.id !== id));
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Colleges</h1>
          <p className="text-gray-600 mt-1">Manage your college applications</p>
        </div>
        <Button onClick={() => setShowSearch(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add College
        </Button>
      </div>

      {/* Demo Notice */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <p className="text-sm text-blue-800">
            <strong>Demo Mode:</strong> This is running with mock data. Set up your database to use real data persistence.
          </p>
        </div>
      </Card>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statusOptions.slice(1).map((status) => (
          <Card key={status} className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts[status] || 0}</div>
            <div className="text-sm text-gray-600">{status}</div>
          </Card>
        ))}
      </div>

      {/* Search Section */}
      {showSearch && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Add a College</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowSearch(false)}
            >
              Cancel
            </Button>
          </div>
          <CollegeSearch
            onAddCollege={handleAddCollege}
            existingColleges={colleges.map(c => c.name)}
          />
        </Card>
      )}

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

      {/* Quick Add Button */}
      {!showSearch && colleges.length > 0 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Another College
          </Button>
        </div>
      )}
    </div>
  );
} 