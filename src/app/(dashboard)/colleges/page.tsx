'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Plus, GraduationCap } from 'lucide-react'
import Link from 'next/link'

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

// Mock data
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

const statusOptions = ['All', 'In Progress', 'Applied', 'Accepted', 'Rejected', 'Waitlisted'];

// Mock components (you'll need to implement these)
const CollegeSearch = ({ onAddCollege, existingColleges }: { onAddCollege: (data: any) => void, existingColleges: string[] }) => {
  return (
    <div className="space-y-4">
      <Input placeholder="Search for colleges..." />
      <Button onClick={() => onAddCollege({ name: 'Test College', location: 'Test, CA', type: 'Private', acceptanceRate: 10, tuition: 50000, enrollment: 10000 })}>
        Add Test College
      </Button>
    </div>
  );
};

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