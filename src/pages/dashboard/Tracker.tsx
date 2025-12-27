import React, { useState } from 'react';
import { TrendingUp, Heart, Activity, Droplet, Scale } from 'lucide-react';
import { useHealthData } from '@/contexts/HealthDataContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const tabs = [
  { id: 'heart', label: 'Heart Rate', icon: Heart, color: 'hsl(var(--heart-red))' },
  { id: 'bp', label: 'Blood Pressure', icon: Activity, color: 'hsl(var(--primary))' },
  { id: 'sugar', label: 'Blood Sugar', icon: Droplet, color: 'hsl(var(--warning))' },
  { id: 'weight', label: 'Weight', icon: Scale, color: 'hsl(var(--success))' },
];

export default function Tracker() {
  const [activeTab, setActiveTab] = useState('heart');
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
        <h2 className="text-lg font-heading font-semibold mb-4">Last 7 Days</h2>
        <div className="h-72">
          {data.length > 0 ? (
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
            <div className="h-full flex items-center justify-center text-muted-foreground">No data yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
