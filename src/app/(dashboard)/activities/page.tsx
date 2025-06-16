'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const gradeLevels = ["9", "10", "11", "12", "Post-grad"];

interface ActivityData {
  position: string;
  organization: string;
}

interface ActivityCardProps {
  index: number;
  expanded: boolean;
  onToggle: () => void;
}

function ActivityCard({ index, expanded, onToggle, position, organization, onPositionChange, onOrganizationChange }: ActivityCardProps & {
  position: string;
  organization: string;
  onPositionChange: (value: string) => void;
  onOrganizationChange: (value: string) => void;
}) {
  const title = position || organization ? `${position}${position && organization ? ' @ ' : ''}${organization}` : 'Untitled Activity';
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={onToggle}>
        <CardTitle className="text-lg font-bold">
          {title}
        </CardTitle>
        {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </CardHeader>
      {expanded && (
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Activity Type</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="volunteering">Volunteering</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Position / Leadership description <span className="text-xs text-gray-400">(0 / 50 characters)</span></Label>
            <Input placeholder="E.g., Team Leader" maxLength={50} value={position} onChange={e => onPositionChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Organization Name <span className="text-xs text-gray-400">(0 / 100 characters)</span></Label>
            <Input placeholder="E.g., Local Food Bank" maxLength={100} value={organization} onChange={e => onOrganizationChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Participation grade levels</Label>
            <div className="flex gap-2 flex-wrap">
              {gradeLevels.map((level) => (
                <div key={level} className="flex items-center gap-1">
                  <Checkbox id={`grade-${index}-${level}`} />
                  <Label htmlFor={`grade-${index}-${level}`} className="text-xs font-normal cursor-pointer">{level}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label>Hours spent per week</Label>
              <Input placeholder="Hours spent per week" type="number" min={0} />
            </div>
            <div className="flex-1 space-y-2">
              <Label>Weeks spent per year</Label>
              <Input placeholder="Weeks spent per year" type="number" min={0} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description <span className="text-xs text-gray-400">(0 / 150 characters)</span></Label>
            <Textarea placeholder="Brief description of your responsibilities and achievements" maxLength={150} />
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function ActivitiesPage() {
  const [expanded, setExpanded] = useState(Array(10).fill(false).map((_, i) => i === 0));
  const [activities, setActivities] = useState<ActivityData[]>(
    Array(10).fill(0).map(() => ({ position: '', organization: '' }))
  );

  const handleToggle = (idx: number) => {
    setExpanded((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const handlePositionChange = (idx: number, value: string) => {
    setActivities((prev) => prev.map((a, i) => i === idx ? { ...a, position: value } : a));
  };
  const handleOrganizationChange = (idx: number, value: string) => {
    setActivities((prev) => prev.map((a, i) => i === idx ? { ...a, organization: value } : a));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2 dark:text-white">My Activities <span className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 px-2 py-0.5 rounded">beta</span></h1>
        <div className="mt-2 text-gray-600 dark:text-gray-300">
          Optimize your Common App activities list with help from Sups.<br />
          Enter as many characters as you want and we can help shorten it.
        </div>
      </div>
      <div>
        {Array.from({ length: 10 }, (_, idx) => idx).map((idx) => (
          <div key={idx}>
            <div className="text-gray-500 text-sm mb-1 mt-4 dark:text-gray-300">Activity {idx + 1}</div>
            <ActivityCard
              index={idx}
              expanded={expanded[idx]}
              onToggle={() => handleToggle(idx)}
              position={activities[idx].position}
              organization={activities[idx].organization}
              onPositionChange={value => handlePositionChange(idx, value)}
              onOrganizationChange={value => handleOrganizationChange(idx, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 