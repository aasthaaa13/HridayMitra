import React from 'react';

interface AnimatedECGWaveProps {
  className?: string;
}

export function AnimatedECGWave({ className = '' }: AnimatedECGWaveProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute top-1/2 left-0 w-[200%] h-32 -translate-y-1/2"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        {/* First ECG pattern */}
        <path
          d="M0,50 L80,50 L90,50 L100,20 L115,80 L130,10 L145,90 L160,50 L200,50 L280,50 L290,50 L300,20 L315,80 L330,10 L345,90 L360,50 L400,50 L480,50 L490,50 L500,20 L515,80 L530,10 L545,90 L560,50 L600,50 L680,50 L690,50 L700,20 L715,80 L730,10 L745,90 L760,50 L800,50 L880,50 L890,50 L900,20 L915,80 L930,10 L945,90 L960,50 L1000,50 L1080,50 L1090,50 L1100,20 L1115,80 L1130,10 L1145,90 L1160,50 L1200,50"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-ecg-flow opacity-60"
        />
        {/* Glow effect */}
        <path
          d="M0,50 L80,50 L90,50 L100,20 L115,80 L130,10 L145,90 L160,50 L200,50 L280,50 L290,50 L300,20 L315,80 L330,10 L345,90 L360,50 L400,50 L480,50 L490,50 L500,20 L515,80 L530,10 L545,90 L560,50 L600,50 L680,50 L690,50 L700,20 L715,80 L730,10 L745,90 L760,50 L800,50 L880,50 L890,50 L900,20 L915,80 L930,10 L945,90 L960,50 L1000,50 L1080,50 L1090,50 L1100,20 L1115,80 L1130,10 L1145,90 L1160,50 L1200,50"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="blur(8px)"
          className="animate-ecg-flow opacity-30"
        />
      </svg>
    </div>
  );
}
