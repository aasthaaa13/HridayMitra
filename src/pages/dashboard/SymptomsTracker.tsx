import React, { useState } from 'react';
import { Stethoscope, Plus, TrendingUp, Lightbulb, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useHealthData } from '@/contexts/HealthDataContext';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const commonSymptoms = [
  'Chest Pain',
  'Shortness of Breath',
  'Fatigue',
  'Dizziness',
  'Palpitations',
  'Swelling in Legs',
  'Headache',
  'Nausea',
  'Cold Sweats',
  'Irregular Heartbeat'
];

const severityColors = {
  mild: 'hsl(var(--success))',
  moderate: 'hsl(var(--warning))',
  severe: 'hsl(var(--destructive))'
};

const tips: Record<string, string[]> = {
  'Chest Pain': [
    'Seek medical attention if pain is severe or persistent',
    'Rest and avoid strenuous activities',
    'Practice deep breathing exercises',
    'Monitor frequency and duration of episodes'
  ],
  'Shortness of Breath': [
    'Sit upright to ease breathing',
    'Use pursed-lip breathing technique',
    'Avoid exposure to pollutants and allergens',
    'Consult your doctor if symptoms worsen'
  ],
  'Fatigue': [
    'Ensure adequate sleep (7-8 hours)',
    'Stay hydrated throughout the day',
    'Consider iron and vitamin B12 levels',
    'Pace your activities to conserve energy'
  ],
  'Dizziness': [
    'Sit or lie down immediately when feeling dizzy',
    'Stay hydrated and avoid sudden movements',
    'Check blood pressure regularly',
    'Avoid caffeine and alcohol'
  ],
  'Palpitations': [
    'Practice relaxation techniques',
    'Reduce caffeine and alcohol intake',
    'Track triggers like stress or certain foods',
    'Seek medical evaluation for frequent episodes'
  ],
  'Swelling in Legs': [
    'Elevate your legs when resting',
    'Reduce salt intake',
    'Wear compression stockings if recommended',
    'Monitor weight daily for sudden changes'
  ],
  'Headache': [
    'Stay hydrated and rest in a quiet room',
    'Monitor blood pressure as headaches can indicate hypertension',
    'Limit screen time and take breaks',
    'Consider keeping a headache diary'
  ],
  'Nausea': [
    'Eat small, frequent meals',
    'Avoid fatty or spicy foods',
    'Stay hydrated with clear fluids',
    'Rest and avoid strong odors'
  ],
  'Cold Sweats': [
    'This may indicate a heart issue—seek medical advice',
    'Rest and monitor other symptoms',
    'Stay calm and practice slow breathing',
    'Note any accompanying symptoms like chest pain'
  ],
  'Irregular Heartbeat': [
    'Avoid stimulants like caffeine and nicotine',
    'Practice stress-reduction techniques',
    'Use our heart rate monitor to track episodes',
    'Consult a cardiologist for persistent irregularities'
  ]
};

export default function SymptomsTracker() {
  const { symptoms, addSymptom } = useHealthData();
  const { toast } = useToast();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [customSymptom, setCustomSymptom] = useState('');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [notes, setNotes] = useState('');

  const handleAddSymptom = () => {
    const symptomName = selectedSymptom || customSymptom;
    if (!symptomName) {
      toast({ title: 'Please select or enter a symptom', variant: 'destructive' });
      return;
    }

    addSymptom({
      date: new Date().toISOString().split('T')[0],
      symptom: symptomName,
      severity,
      notes
    });

    toast({ title: 'Symptom logged successfully' });
    setShowAddForm(false);
    setSelectedSymptom('');
    setCustomSymptom('');
    setSeverity('mild');
    setNotes('');
  };

  // Get weekly symptom data for chart
  const getWeeklyData = () => {
    const today = new Date();
    const weekData: { day: string; mild: number; moderate: number; severe: number }[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      const daySymptoms = symptoms.filter(s => s.date === dateStr);
      weekData.push({
        day: dayName,
        mild: daySymptoms.filter(s => s.severity === 'mild').length,
        moderate: daySymptoms.filter(s => s.severity === 'moderate').length,
        severe: daySymptoms.filter(s => s.severity === 'severe').length
      });
    }
    
    return weekData;
  };

  // Get most common symptoms
  const getMostCommonSymptoms = () => {
    const counts: Record<string, number> = {};
    symptoms.forEach(s => {
      counts[s.symptom] = (counts[s.symptom] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([symptom]) => symptom);
  };

  const weeklyData = getWeeklyData();
  const commonReported = getMostCommonSymptoms();

  // Get tips for most common symptoms
  const relevantTips = commonReported.flatMap(s => tips[s] || []).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Stethoscope className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold">Symptoms Tracker</h1>
              <p className="text-muted-foreground">Log and monitor your symptoms over time</p>
            </div>
          </div>
          <Button variant="hero" onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Log Symptom
          </Button>
        </div>
      </div>

      {/* Add Symptom Form */}
      {showAddForm && (
        <div className="glass-card p-6 animate-fade-in">
          <h2 className="text-lg font-heading font-semibold mb-4">Log New Symptom</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Symptom</label>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map(s => (
                  <button
                    key={s}
                    onClick={() => { setSelectedSymptom(s); setCustomSymptom(''); }}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedSymptom === s 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Or Enter Custom</label>
              <Input
                placeholder="Enter symptom name..."
                value={customSymptom}
                onChange={(e) => { setCustomSymptom(e.target.value); setSelectedSymptom(''); }}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Severity</label>
              <div className="flex gap-3">
                {(['mild', 'moderate', 'severe'] as const).map(sev => (
                  <button
                    key={sev}
                    onClick={() => setSeverity(sev)}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all capitalize font-medium ${
                      severity === sev 
                        ? sev === 'mild' ? 'border-success bg-success/10 text-success' 
                          : sev === 'moderate' ? 'border-warning bg-warning/10 text-warning'
                          : 'border-destructive bg-destructive/10 text-destructive'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Notes (Optional)</label>
              <Input
                placeholder="Any additional details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="hero" onClick={handleAddSymptom} className="flex-1">
                Log Symptom
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-heading font-semibold">Weekly Overview</h2>
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm text-muted-foreground">Mild</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-sm text-muted-foreground">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-sm text-muted-foreground">Severe</span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))', 
                  borderRadius: '12px' 
                }} 
              />
              <Bar dataKey="mild" stackId="a" fill="hsl(var(--success))" radius={[0, 0, 0, 0]} />
              <Bar dataKey="moderate" stackId="a" fill="hsl(var(--warning))" radius={[0, 0, 0, 0]} />
              <Bar dataKey="severe" stackId="a" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tips Based on Symptoms */}
      {relevantTips.length > 0 && (
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="h-5 w-5 text-warning" />
            <h2 className="text-lg font-heading font-semibold">Tips Based on Your Symptoms</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {relevantTips.map((tip, i) => (
              <div key={i} className="p-4 bg-muted/50 rounded-xl flex gap-3">
                <span className="text-primary font-semibold">{i + 1}.</span>
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Symptoms */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-heading font-semibold">Recent Symptoms</h2>
        </div>
        
        {symptoms.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Stethoscope className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No symptoms logged yet</p>
            <p className="text-sm">Start tracking your symptoms to see patterns</p>
          </div>
        ) : (
          <div className="space-y-3">
            {symptoms.slice().reverse().slice(0, 10).map((s, i) => (
              <div key={s.id || i} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: severityColors[s.severity] }}
                  />
                  <div>
                    <p className="font-medium">{s.symptom}</p>
                    {s.notes && <p className="text-sm text-muted-foreground">{s.notes}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className={`text-xs capitalize ${
                    s.severity === 'mild' ? 'text-success' 
                    : s.severity === 'moderate' ? 'text-warning' 
                    : 'text-destructive'
                  }`}>
                    {s.severity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
