import React from 'react';
import { 
  Heart, 
  Activity, 
  Brain, 
  MapPin, 
  FileText, 
  Shield,
  Fingerprint,
  TrendingUp,
  MessageCircle
} from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Heart Disease Assessment',
    description: 'Comprehensive AI-powered analysis of your cardiac health based on multiple health parameters.',
    color: 'text-heart-red',
    bgColor: 'bg-heart-red/10',
  },
  {
    icon: Fingerprint,
    title: 'Heart Rate Measurement',
    description: 'Measure your heart rate using your phone camera with advanced PPG technology.',
    color: 'text-heart-pink',
    bgColor: 'bg-heart-pink/10',
  },
  {
    icon: Brain,
    title: 'AI Health Assistant',
    description: 'Chat with Cura, your personal AI health assistant for instant medical guidance.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: TrendingUp,
    title: 'Health Tracking',
    description: 'Monitor your vitals over time with beautiful charts and trend analysis.',
    color: 'text-health-green',
    bgColor: 'bg-health-green/10',
  },
  {
    icon: MapPin,
    title: 'Find Nearby Doctors',
    description: 'Locate cardiologists and hospitals near you using real-time Google Maps integration.',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    icon: FileText,
    title: 'Health Reports',
    description: 'Generate detailed PDF reports of your health assessments and predictions.',
    color: 'text-secondary-foreground',
    bgColor: 'bg-secondary',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-soft" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-6">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Everything You Need for{' '}
            <span className="bg-gradient-hero bg-clip-text text-transparent">Heart Health</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive tools powered by AI and machine learning to help you understand and improve your cardiac wellness.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-card p-6 hover:shadow-xl transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
