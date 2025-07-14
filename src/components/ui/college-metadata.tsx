import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CollegeInfo } from '@/lib/college-database';

interface CollegeMetadataProps {
  college: {
    name: string;
    location?: string;
    type?: string;
    acceptanceRate?: number;
    tuitionInState?: number;
    tuitionOutOfState?: number;
    tuition?: number;
    enrollment?: number;
    domain?: string;
  };
  enhancedData?: CollegeInfo;
}

export function CollegeMetadata({ college, enhancedData }: CollegeMetadataProps) {
  const formatCurrency = (amount?: number | string) => {
    if (!amount) return 'N/A';
    if (typeof amount === 'string') return amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num?: number | string) => {
    if (!num) return 'N/A';
    if (typeof num === 'string') return num;
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (rate?: number | string) => {
    if (!rate) return 'N/A';
    if (typeof rate === 'string') return rate;
    return `${rate.toFixed(0)}%`;
  };

  const getAcceptanceRate = () => {
    return enhancedData?.freshmanAcceptanceRate || college.acceptanceRate;
  };

  const getTuitionData = () => {
    if (enhancedData) {
      return {
        inState: enhancedData.inStateCOA,
        outOfState: enhancedData.outOfStateCOA,
        isPublic: false // Default to private since we don't have type info
      };
    }
    const isPublic = college.type?.toLowerCase() === 'public';
    return {
      inState: isPublic ? college.tuitionInState : undefined,
      outOfState: isPublic ? college.tuitionOutOfState : undefined,
      private: !isPublic ? college.tuition : undefined,
      isPublic
    };
  };

  const getEnrollment = () => {
    return enhancedData?.undergradPopulation || college.enrollment;
  };

  const tuitionData = getTuitionData();
  const acceptanceRate = getAcceptanceRate();
  const enrollment = getEnrollment();

  // Clean, minimal layout
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-x-8 gap-y-2 items-center text-[15px]">
        {/* Acceptance Rate */}
        <div className="flex flex-col min-w-[90px]">
          <span className="font-bold text-foreground">{formatPercentage(acceptanceRate)}</span>
          <span className="text-xs text-muted-foreground">Acceptance rate</span>
        </div>
        {/* App Fee (if available) - positioned as second item */}
        {enhancedData?.appFee && (
          <div className="flex flex-col min-w-[90px]">
            <span className="font-bold text-foreground">{enhancedData.appFee}</span>
            <span className="text-xs text-muted-foreground">App fee</span>
          </div>
        )}
        {/* Tuition (show in-state or private tuition) */}
        <div className="flex flex-col min-w-[90px]">
          <span className="font-bold text-foreground">
            {tuitionData.isPublic
              ? formatCurrency(tuitionData.inState)
              : formatCurrency(tuitionData.private || tuitionData.inState)}
          </span>
          <span className="text-xs text-muted-foreground">Cost</span>
        </div>
        {/* Enrollment */}
        <div className="flex flex-col min-w-[90px]">
          <span className="font-bold text-foreground">{formatNumber(enrollment)}</span>
          <span className="text-xs text-muted-foreground">Undergrads</span>
        </div>
        {/* Test Policy (if available) */}
        {enhancedData?.testPolicy && (
          <div className="flex flex-col min-w-[90px]">
            <span className="font-bold text-foreground">{enhancedData.testPolicy}</span>
            <span className="text-xs text-muted-foreground">Test policy</span>
          </div>
        )}
      </div>
    </div>
  );
} 