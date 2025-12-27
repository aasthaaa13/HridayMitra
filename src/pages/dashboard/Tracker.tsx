import React, { useState } from 'react';
import { TrendingUp, Heart, Activity, Droplet, Scale, AlertCircle } from 'lucide-react';
import { useHealthData } from '@/contexts/HealthDataContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MIN_DATA_POINTS = 2;

const tabs = [
  { id: 'heart', label: 'Heart Rate', icon: Heart, color: 'hsl(var(--heart-red))' },
  { id: 'bp', label: 'Blood Pressure', icon: Activity, color: 'hsl(var(--primary))' },
  { id: 'sugar', label: 'Blood Sugar', icon: Droplet, color: 'hsl(var(--warning))' },
  { id: 'weight', label: 'Weight', icon: Scale, color: 'hsl(var(--success))' },
];

export default function Tracker() {
  const [activeTab, setActiveTab] = useState('heart');
  const navigate = useNavigate();
  const { getRecentHeartRates, getRecentBloodPressure, getRecentBloodSugar, getRecentWeight } = useHealthData();

  const getData = () => {
    switch (activeTab) {
      case 'heart': return getRecentHeartRates();
      case 'bp': return getRecentBloodPressure();
      case 'sugar': return getRecentBloodSugar();
      case 'weight': return getRecentWeight();
      default: return [];
    }
  };

  const data = getData();
  const hasEnoughData = data.length >= MIN_DATA_POINTS;

  const getEmptyStateMessage = () => {
    switch (activeTab) {
      case 'heart':
        return { action: 'Measure your heart rate', path: '/dashboard/heart-rate' };
      case 'bp':
      case 'sugar':
      case 'weight':
        return { action: 'Complete a health assessment', path: '/dashboard/assessment' };
      default:
        return { action: 'Add health data', path: '/dashboard/assessment' };
    }
  };

  const emptyState = getEmptyStateMessage();

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
            <TrendingUp className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">Health Tracker</h1>
            <p className="text-muted-foreground">Monitor your vitals over time</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold">Last 7 Days</h2>
          <span className="text-xs text-muted-foreground">
            {data.length} measurement{data.length !== 1 ? 's' : ''} recorded
          </span>
        </div>
        <div className="h-72">
          {hasEnoughData ? (
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'bp' ? (
                <BarChart data={data}>
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => new Date(v).toLocaleDateString('en-US', { weekday: 'short' })} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
                  <Bar dataKey="systolic" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="diastolic" fill="hsl(var(--primary) / 0.5)" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={data}>
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => new Date(v).toLocaleDateString('en-US', { weekday: 'short' })} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="value" stroke={tabs.find(t => t.id === activeTab)?.color} strokeWidth={3} dot={{ strokeWidth: 2, r: 4 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="mb-1">
                  {data.length === 0 
                    ? 'No data yet' 
                    : `${data.length} measurement recorded. Need at least ${MIN_DATA_POINTS} to show trends.`
                  }
                </p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => navigate(emptyState.path)}
                >
                  {emptyState.action}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
