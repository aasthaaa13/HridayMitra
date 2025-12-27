import React from 'react';

interface DataSyncIndicatorProps {
  className?: string;
}

export function DataSyncIndicator({ className = '' }: DataSyncIndicatorProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="w-1.5 h-1.5 rounded-full bg-health-teal animate-sync-dot-1" />
      <div className="w-1.5 h-1.5 rounded-full bg-health-teal animate-sync-dot-2" />
      <div className="w-1.5 h-1.5 rounded-full bg-health-teal animate-sync-dot-3" />
    </div>
  );
}
