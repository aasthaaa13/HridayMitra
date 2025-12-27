import React from 'react';

interface ECGWaveProps {
  className?: string;
  color?: string;
}

export function ECGWave({ className = '', color = 'hsl(var(--heart-red))' }: ECGWaveProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden opacity-20 ${className}`}>
      <svg
        className="w-full h-full animate-ecg-scroll"
        viewBox="0 0 600 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 L50,50 L60,50 L70,30 L80,70 L90,20 L100,80 L110,50 L120,50 L180,50 L200,50 L210,50 L220,30 L230,70 L240,20 L250,80 L260,50 L270,50 L330,50 L350,50 L360,50 L370,30 L380,70 L390,20 L400,80 L410,50 L420,50 L480,50 L500,50 L510,50 L520,30 L530,70 L540,20 L550,80 L560,50 L570,50 L600,50"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
