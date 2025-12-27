import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <span className="text-xs text-muted-foreground font-medium animate-status-fade">
        Scroll to explore
      </span>
      <div className="relative w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center">
        <div className="absolute top-2 w-1.5 h-3 rounded-full bg-primary animate-scroll-indicator" />
      </div>
      <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce-subtle" />
    </div>
  );
}
