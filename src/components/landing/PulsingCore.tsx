import React from 'react';
import { Heart } from 'lucide-react';

interface PulsingCoreProps {
  className?: string;
}

export function PulsingCore({ className = '' }: PulsingCoreProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer glow rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-80 h-80 rounded-full bg-gradient-hero opacity-5 animate-pulse-ring-outer" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-72 h-72 rounded-full bg-primary/10 animate-pulse-ring-outer" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-primary/15 animate-pulse-ring-outer" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Core glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-56 h-56 bg-gradient-hero rounded-full opacity-20 animate-breathe blur-xl" />
      </div>
      
      {/* Heart container */}
      <div className="relative flex items-center justify-center">
        <div className="w-48 h-48 bg-gradient-to-br from-heart-red/20 to-heart-pink/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-heart-red/10">
          <Heart 
            className="w-24 h-24 text-heart-red animate-heartbeat drop-shadow-lg" 
            fill="currentColor"
            style={{ filter: 'drop-shadow(0 0 20px hsl(var(--heart-red) / 0.4))' }}
          />
        </div>
      </div>
      
      {/* Pulse rings emanating from heart */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full border-2 border-heart-red/30 animate-pulse-ring" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full border border-heart-red/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
}
