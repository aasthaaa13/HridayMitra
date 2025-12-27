import React from 'react';

interface ConfidenceGlowProps {
  level: 'low' | 'medium' | 'high';
  children: React.ReactNode;
  className?: string;
}

const glowColors = {
  low: 'shadow-glow-green',
  medium: 'shadow-glow-warning',
  high: 'shadow-glow-red',
};

export function ConfidenceGlow({ level, children, className = '' }: ConfidenceGlowProps) {
  return (
    <div className={`relative animate-breathe ${glowColors[level]} ${className}`}>
      {children}
    </div>
  );
}
