import React from 'react';
import { Activity } from 'lucide-react';

interface LiveIndicatorProps {
  className?: string;
}

export function LiveIndicator({ className = '' }: LiveIndicatorProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-health-green animate-live-pulse" />
        <div className="absolute w-2 h-2 rounded-full bg-health-green animate-live-ping" />
      </div>
      <span className="text-xs font-medium text-health-green animate-status-fade">
        Live Monitoring
      </span>
    </div>
  );
}
