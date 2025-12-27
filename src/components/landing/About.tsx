import React from 'react';
import { Heart, Users, Award, Clock } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Active Users' },
  { icon: Heart, value: '50,000+', label: 'Assessments' },
  { icon: Award, value: '99.2%', label: 'Accuracy Rate' },
  { icon: Clock, value: '24/7', label: 'AI Support' },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
              <Heart className="h-4 w-4 text-heart-red" />
              <span className="text-sm font-medium text-secondary-foreground">About HridayMitra</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
              Empowering You with{' '}
              <span className="bg-gradient-hero bg-clip-text text-transparent">AI-Driven</span>{' '}
              Heart Care
            </h2>
            
            <p className="text-lg text-muted-foreground">
              HridayMitra (meaning "Heart Friend" in Sanskrit) is an innovative healthcare platform 
              that combines advanced machine learning algorithms with comprehensive cardiac data analysis 
              to provide accurate heart disease risk predictions.
            </p>
            
            <p className="text-muted-foreground">
              Our mission is to make cardiac health monitoring accessible to everyone. Using 
              state-of-the-art AI models trained on extensive medical datasets, we help you 
              understand your heart health and take proactive steps towards a healthier life.
            </p>

            {/* Disclaimer */}
            <div className="glass-card p-4 border-l-4 border-warning">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Medical Disclaimer:</strong> HridayMitra provides 
                AI-assisted predictions for educational purposes only. This is not a substitute for 
                professional medical advice, diagnosis, or treatment. Always consult a qualified 
                healthcare provider for medical concerns.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="glass-card p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-heading font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
