import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Activity, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedECGWave } from './AnimatedECGWave';
import { PulsingCore } from './PulsingCore';
import { FloatingMetrics } from './FloatingMetrics';
import { OrbitingRings } from './OrbitingRings';
import { TypewriterText } from './TypewriterText';
import { ScrollIndicator } from './ScrollIndicator';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-soft" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-health-blue/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Floating Elements */}
      <div className="absolute top-32 left-10 w-20 h-20 bg-accent rounded-2xl rotate-12 float-animation opacity-40" />
      <div className="absolute top-60 right-20 w-16 h-16 bg-secondary rounded-xl -rotate-12 float-animation opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/20 rounded-full float-animation opacity-40" style={{ animationDelay: '4s' }} />
      <div className="absolute top-40 right-1/3 w-8 h-8 bg-health-teal/20 rounded-lg rotate-45 float-animation opacity-30" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 animate-fade-in group hover:border-primary/30 transition-colors duration-300">
              <Sparkles className="h-4 w-4 text-primary animate-pulse-glow" />
              <span className="text-sm font-medium text-secondary-foreground">AI-Powered Heartcare</span>
              <div className="flex gap-0.5 ml-1">
                <div className="w-1 h-1 rounded-full bg-health-green animate-sync-dot-1" />
                <div className="w-1 h-1 rounded-full bg-health-green animate-sync-dot-2" />
                <div className="w-1 h-1 rounded-full bg-health-green animate-sync-dot-3" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Your Personal{' '}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                <TypewriterText 
                  texts={['Heart Assistant', 'Health Guardian', 'Care Partner']}
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseDuration={3000}
                />
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
                className="group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Assessment
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl"
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
                className="group"
              >
                <span className="relative">
                  Explore Features
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </span>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 text-muted-foreground group cursor-default">
                <div className="p-1.5 rounded-lg bg-health-green/10 group-hover:bg-health-green/20 transition-colors">
                  <Shield className="h-4 w-4 text-health-green" />
                </div>
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground group cursor-default">
                <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">99.2% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground group cursor-default">
                <div className="p-1.5 rounded-lg bg-heart-red/10 group-hover:bg-heart-red/20 transition-colors">
                  <Heart className="h-4 w-4 text-heart-red" />
                </div>
                <span className="text-sm">10K+ Users</span>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Orbiting Rings */}
              <OrbitingRings />
              
              {/* ECG Wave Background */}
              <AnimatedECGWave className="opacity-40" />
              
              {/* Main Heart Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <PulsingCore />
              </div>

              {/* Floating Data Cards */}
              <FloatingMetrics />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
