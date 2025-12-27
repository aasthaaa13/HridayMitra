import React from 'react';

interface OrbitingRingsProps {
  className?: string;
}

export function OrbitingRings({ className = '' }: OrbitingRingsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Inner Ring */}
      <div className="absolute inset-8 rounded-full border border-primary/10 animate-orbit-slow" />
      
      {/* Middle Ring with dots */}
      <div className="absolute inset-4 rounded-full border border-primary/5 animate-orbit-reverse">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-health-teal/40" />
      </div>
      
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border border-primary/5 animate-orbit-slow">
        <div className="absolute top-1/4 right-0 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/30" />
        <div className="absolute bottom-1/4 left-0 -translate-x-1/2 w-1 h-1 rounded-full bg-health-green/30" />
      </div>
    </div>
  );
}
