import React from 'react';
import { Activity } from 'lucide-react';

interface StatusBadgeProps {
  status?: 'monitoring' | 'analyzing' | 'syncing';
  className?: string;
}

const statusConfig = {
  monitoring: {
    text: 'Monitoring Live',
    dotColor: 'bg-health-green',
  },
  analyzing: {
    text: 'Analyzing Health',
    dotColor: 'bg-primary',
  },
  syncing: {
    text: 'Syncing Data',
    dotColor: 'bg-health-teal',
  },
};

export function StatusBadge({ status = 'monitoring', className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 animate-status-fade ${className}`}>
      <span className={`w-2 h-2 rounded-full ${config.dotColor} animate-pulse-glow`} />
      <span className="text-xs font-medium text-muted-foreground">{config.text}</span>
      <Activity className="h-3 w-3 text-muted-foreground animate-pulse" />
    </div>
  );
}
