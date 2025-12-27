import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Activity, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-soft" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-health-blue/5 rounded-full blur-3xl" />
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 w-20 h-20 bg-accent rounded-2xl rotate-12 float-animation opacity-60" />
      <div className="absolute top-60 right-20 w-16 h-16 bg-secondary rounded-xl -rotate-12 float-animation opacity-60" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/20 rounded-full float-animation opacity-60" style={{ animationDelay: '4s' }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-secondary-foreground">AI-Powered Heartcare</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Your Personal{' '}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Heart Assistant
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Advanced AI-based heart disease prediction powered by machine learning. 
              Get personalized health insights and take control of your cardiac wellness.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => navigate('/auth?mode=signup')}
                className="group"
              >
                Start Assessment
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl"
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Features
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-5 w-5 text-health-green" />
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Activity className="h-5 w-5 text-primary" />
                <span className="text-sm">99.2% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="h-5 w-5 text-heart-red" />
                <span className="text-sm">10K+ Users</span>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Heart Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-hero rounded-full opacity-20 animate-pulse-glow" />
                  <Heart 
                    className="absolute inset-0 m-auto w-32 h-32 text-heart-red heartbeat" 
                    fill="currentColor"
                  />
                </div>
              </div>
              
              {/* ECG Line */}
              <svg 
                className="absolute top-1/2 left-0 right-0 w-full h-24 -translate-y-1/2"
                viewBox="0 0 400 100"
              >
                <path
                  d="M0,50 L80,50 L90,50 L100,20 L110,80 L120,50 L130,50 L150,50 L160,35 L170,65 L180,50 L400,50"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  className="ecg-line"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                />
              </svg>

              {/* Floating Data Cards */}
              <div className="absolute top-10 right-0 glass-card p-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-health-green/20 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-health-green" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Heart Rate</p>
                    <p className="font-bold text-foreground">72 BPM</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 left-0 glass-card p-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Risk Level</p>
                    <p className="font-bold text-health-green">Low</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
