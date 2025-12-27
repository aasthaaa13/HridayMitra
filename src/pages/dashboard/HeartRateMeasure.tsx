import React, { useState, useRef, useEffect } from 'react';
import { Fingerprint, Play, Square, Heart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHealthData } from '@/contexts/HealthDataContext';
import { useToast } from '@/hooks/use-toast';

export default function HeartRateMeasure() {
  const [isRecording, setIsRecording] = useState(false);
  const [bpm, setBpm] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [signal, setSignal] = useState('Place finger on camera');
  const { addHealthRecord } = useHealthData();
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMeasurement = () => {
    setIsRecording(true);
    setBpm(null);
    setProgress(0);
    setSignal('Measuring... Hold still');
    
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          stopMeasurement();
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const stopMeasurement = () => {
    setIsRecording(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    const measuredBpm = Math.floor(Math.random() * 25) + 65;
    setBpm(measuredBpm);
    setSignal('Measurement complete ✓');
    
    addHealthRecord({
      date: new Date().toISOString().split('T')[0],
      heartRate: measuredBpm,
    });
    
    toast({ title: 'Heart Rate Recorded', description: `Your heart rate: ${measuredBpm} BPM` });
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="glass-card p-6 text-center">
        <div className="w-16 h-16 bg-heart-pink/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Fingerprint className="h-8 w-8 text-heart-pink" />
        </div>
        <h1 className="text-2xl font-heading font-bold mb-2">Heart Rate Monitor</h1>
        <p className="text-muted-foreground">Place your finger on the camera to measure</p>
      </div>

      <div className="glass-card p-8">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className={`absolute inset-0 rounded-full border-8 ${isRecording ? 'border-heart-pink animate-pulse' : 'border-muted'} flex items-center justify-center`}>
            {bpm ? (
              <div className="text-center">
                <Heart className="h-8 w-8 text-heart-red mx-auto mb-2 heartbeat" fill="currentColor" />
                <span className="text-4xl font-heading font-bold">{bpm}</span>
                <span className="text-lg text-muted-foreground ml-1">BPM</span>
              </div>
            ) : (
              <Fingerprint className={`h-16 w-16 ${isRecording ? 'text-heart-pink' : 'text-muted-foreground'}`} />
            )}
          </div>
          {isRecording && (
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="hsl(var(--heart-pink))" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={`${progress * 5.53} 553`} />
            </svg>
          )}
        </div>

        <p className="text-center text-muted-foreground mb-6">{signal}</p>

        <Button variant={isRecording ? "destructive" : "hero"} className="w-full" size="lg" onClick={isRecording ? stopMeasurement : startMeasurement}>
          {isRecording ? <><Square className="h-5 w-5 mr-2" />Stop</> : <><Play className="h-5 w-5 mr-2" />Start Measurement</>}
        </Button>
      </div>

      <div className="glass-card p-4 border-l-4 border-warning">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-warning flex-shrink-0" />
          <p className="text-sm text-muted-foreground">This is a simulated measurement for demo purposes. For accurate readings, use a medical device.</p>
        </div>
      </div>
    </div>
  );
}
