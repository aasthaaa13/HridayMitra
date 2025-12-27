import React, { useState, useEffect } from 'react';
import { Activity, Heart, Zap, TrendingUp } from 'lucide-react';
import { LiveIndicator } from './LiveIndicator';

interface FloatingMetricsProps {
  className?: string;
}

export function FloatingMetrics({ className = '' }: FloatingMetricsProps) {
  const [bpm, setBpm] = useState(72);
  const [riskScore, setRiskScore] = useState(12);

  // Simulate real-time BPM updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(68, Math.min(78, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Occasional risk score fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskScore(prev => {
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(8, Math.min(18, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Heart Rate Card - Top Right */}
      <div 
        className={`absolute top-8 right-0 glass-card p-4 animate-float-card ${className}`}
        style={{ animationDelay: '0s' }}
      >
        <LiveIndicator className="mb-2" />
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-heart-red/10 rounded-xl flex items-center justify-center">
              <Heart className="h-6 w-6 text-heart-red animate-heartbeat" fill="currentColor" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-heart-red/20 animate-pulse-ring-slow" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Heart Rate</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground transition-all duration-300">
                {bpm}
              </span>
              <span className="text-sm text-muted-foreground">BPM</span>
            </div>
          </div>
        </div>
        <div className="mt-3 h-8 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path
              d="M0,15 L20,15 L25,15 L30,5 L35,25 L40,15 L45,15 L60,15 L65,15 L70,5 L75,25 L80,15 L100,15"
              fill="none"
              stroke="hsl(var(--heart-red))"
              strokeWidth="1.5"
              className="animate-ecg-mini"
            />
          </svg>
        </div>
      </div>

      {/* Risk Assessment Card - Bottom Left */}
      <div 
        className="absolute bottom-16 left-0 glass-card p-4 animate-float-card"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-health-green/10 rounded-xl flex items-center justify-center animate-breathe">
              <TrendingUp className="h-6 w-6 text-health-green" />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Risk Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-health-green transition-all duration-500">
                {riskScore}%
              </span>
              <span className="text-xs text-health-green font-medium">Low</span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i < 1 ? 'bg-health-green' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* AI Analysis Badge - Top Left */}
      <div 
        className="absolute top-20 -left-4 glass-card px-3 py-2 animate-float-card"
        style={{ animationDelay: '1s' }}
      >
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary animate-pulse-glow" />
          <span className="text-xs font-medium text-foreground">AI Analyzing</span>
          <div className="flex gap-0.5">
            <div className="w-1 h-1 rounded-full bg-primary animate-sync-dot-1" />
            <div className="w-1 h-1 rounded-full bg-primary animate-sync-dot-2" />
            <div className="w-1 h-1 rounded-full bg-primary animate-sync-dot-3" />
          </div>
        </div>
      </div>

      {/* Activity Spark - Bottom Right */}
      <div 
        className="absolute bottom-32 right-4 glass-card px-3 py-2 animate-float-card"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-health-teal" />
          <span className="text-xs font-medium text-muted-foreground">Healthy Pattern</span>
        </div>
      </div>
    </>
  );
}
