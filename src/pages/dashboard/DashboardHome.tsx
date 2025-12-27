import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Activity, 
  Droplet, 
  Scale, 
  TrendingUp,
  ArrowRight,
  Fingerprint,
  FileHeart,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHealthData } from '@/contexts/HealthDataContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardHome() {
  const navigate = useNavigate();
  const { getRecentHeartRates, healthRecords } = useHealthData();

  const heartRateData = getRecentHeartRates();
  const latestRecord = healthRecords[healthRecords.length - 1];

  const quickStats = [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: latestRecord?.heartRate ? `${latestRecord.heartRate} BPM` : '--',
      color: 'text-heart-red',
      bgColor: 'bg-heart-red/10',
    },
    {
      icon: Activity,
      label: 'Blood Pressure',
      value: latestRecord?.bloodPressureSystolic 
        ? `${latestRecord.bloodPressureSystolic}/${latestRecord.bloodPressureDiastolic}` 
        : '--',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Droplet,
      label: 'Blood Sugar',
      value: latestRecord?.bloodSugar ? `${latestRecord.bloodSugar} mg/dL` : '--',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      icon: Scale,
      label: 'Weight',
      value: latestRecord?.weight ? `${latestRecord.weight} kg` : '--',
      color: 'text-health-green',
      bgColor: 'bg-health-green/10',
    },
  ];

  const quickActions = [
    {
      icon: Fingerprint,
      title: 'Measure Heart Rate',
      description: 'Use camera-based PPG technology',
      path: '/dashboard/heart-rate',
      color: 'text-heart-pink',
      bgColor: 'bg-heart-pink/10',
    },
    {
      icon: FileHeart,
      title: 'Health Assessment',
      description: 'AI-powered risk prediction',
      path: '/dashboard/assessment',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div 
            key={stat.label}
            className="glass-card p-5 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className="glass-card p-6 text-left hover:shadow-lg transition-all group animate-fade-in"
            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${action.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <action.icon className={`h-7 w-7 ${action.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-semibold text-foreground">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        ))}
      </div>

      {/* Heart Rate Chart */}
      <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">Heart Rate Trend</h3>
            <p className="text-sm text-muted-foreground">Last 7 days</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/tracker')}>
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="h-64">
          {heartRateData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData}>
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: number) => [`${value} BPM`, 'Heart Rate']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--heart-red))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--heart-red))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No heart rate data yet</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => navigate('/dashboard/heart-rate')}
                >
                  Measure now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="glass-card p-4 border-l-4 border-warning animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">Medical Disclaimer</p>
            <p className="text-sm text-muted-foreground">
              HridayMitra provides AI-assisted predictions for educational purposes only. 
              This is not a substitute for professional medical advice. Always consult a healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
