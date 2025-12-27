import React from 'react';
import { Heart } from 'lucide-react';

interface PulsingHeartProps {
  bpm?: number;
  className?: string;
}

export function PulsingHeart({ bpm = 72, className = '' }: PulsingHeartProps) {
  // Calculate animation duration based on BPM (60s / BPM)
  const pulseDuration = bpm > 0 ? 60 / bpm : 0.83;
  
  return (
    <div className={`relative ${className}`}>
      <div 
        className="absolute inset-0 bg-heart-red/20 rounded-full animate-pulse-ring"
        style={{ animationDuration: `${pulseDuration}s` }}
      />
      <div 
        className="absolute inset-2 bg-heart-red/10 rounded-full animate-pulse-ring"
        style={{ animationDuration: `${pulseDuration}s`, animationDelay: '0.1s' }}
      />
      <div className="relative w-full h-full flex items-center justify-center">
        <Heart 
          className="h-8 w-8 text-heart-red animate-heartbeat" 
          style={{ animationDuration: `${pulseDuration}s` }}
          fill="currentColor"
        />
      </div>
    </div>
  );
}
