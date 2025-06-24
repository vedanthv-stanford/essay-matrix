'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CollegeLogo } from '@/components/ui/college-logo';
import { findCollegeDomain } from '@/lib/college-domains';

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
  website?: string;
}

interface CollegeCardProps {
  college: College;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onEdit: (college: College) => void;
}

const statusColors = {
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Applied': 'bg-blue-100 text-blue-800',
  'Accepted': 'bg-green-100 text-green-800',
  'Rejected': 'bg-red-100 text-red-800',
  'Waitlisted': 'bg-orange-100 text-orange-800',
};

const statusOptions = [
  'In Progress',
  'Applied',
  'Accepted',
  'Rejected',
  'Waitlisted',
];

export function CollegeCard({ college, onUpdateStatus, onDelete, onEdit }: CollegeCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      await onUpdateStatus(college.id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num?: number) => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Get domain for the college
  const collegeDomain = findCollegeDomain(college.name);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <CollegeLogo 
              collegeName={college.name}
              domain={collegeDomain || undefined}
              size={48}
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg truncate">{college.name}</h3>
                {college.priority && (
                  <Badge variant="outline" className="text-xs">
                    Priority {college.priority}
                  </Badge>
                )}
              </div>
              
              {college.location && (
                <p className="text-sm text-gray-600 mb-2">{college.location}</p>
              )}
              
              <div className="flex items-center gap-2 mb-2">
                <Select
                  value={college.status}
                  onValueChange={handleStatusChange}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Badge 
                  className={`text-xs ${statusColors[college.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}
                >
                  {college.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                {college.type && (
                  <div>
                    <span className="font-medium">Type:</span> {college.type}
                  </div>
                )}
                {college.acceptanceRate && (
                  <div>
                    <span className="font-medium">Acceptance:</span> {college.acceptanceRate}%
                  </div>
                )}
                {college.tuition && (
                  <div>
                    <span className="font-medium">Tuition:</span> {formatCurrency(college.tuition)}
                  </div>
                )}
                {college.enrollment && (
                  <div>
                    <span className="font-medium">Enrollment:</span> {formatNumber(college.enrollment)}
                  </div>
                )}
              </div>
              
              {college.notes && (
                <div className="mt-2 text-xs text-gray-600">
                  <span className="font-medium">Notes:</span> {college.notes}
                </div>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(college)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(college.id)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
} 