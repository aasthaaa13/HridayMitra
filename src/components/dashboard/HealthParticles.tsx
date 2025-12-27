import React from 'react';
import { Heart, Activity, Droplet, Shield } from 'lucide-react';

const particles = [
  { Icon: Heart, delay: '0s', duration: '15s', left: '10%', top: '20%' },
  { Icon: Activity, delay: '3s', duration: '18s', left: '80%', top: '30%' },
  { Icon: Droplet, delay: '6s', duration: '20s', left: '60%', top: '60%' },
  { Icon: Shield, delay: '9s', duration: '17s', left: '25%', top: '70%' },
  { Icon: Heart, delay: '12s', duration: '19s', left: '90%', top: '80%' },
];

export function HealthParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute animate-float-particle opacity-[0.03]"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        >
          <particle.Icon className="h-8 w-8 text-primary" />
        </div>
      ))}
    </div>
  );
}
