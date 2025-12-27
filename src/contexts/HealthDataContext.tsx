import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HealthRecord {
  id: string;
  date: string;
  heartRate?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  bloodSugar?: number;
  weight?: number;
  cholesterol?: number;
  riskLevel?: 'Low' | 'Medium' | 'High';
  riskPercentage?: number;
}

interface Symptom {
  id: string;
  date: string;
  symptom: string;
  severity: 'mild' | 'moderate' | 'severe';
  notes?: string;
}

interface HealthDataContextType {
  healthRecords: HealthRecord[];
  symptoms: Symptom[];
  addHealthRecord: (record: Omit<HealthRecord, 'id'>) => void;
  addSymptom: (symptom: Omit<Symptom, 'id'>) => void;
  getRecentHeartRates: () => { date: string; value: number }[];
  getRecentBloodPressure: () => { date: string; systolic: number; diastolic: number }[];
  getRecentBloodSugar: () => { date: string; value: number }[];
  getRecentWeight: () => { date: string; value: number }[];
}

const HealthDataContext = createContext<HealthDataContextType | undefined>(undefined);

export function HealthDataProvider({ children }: { children: ReactNode }) {
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(() => {
    const stored = localStorage.getItem('hridaymitra_health_records');
    return stored ? JSON.parse(stored) : [];
  });

  const [symptoms, setSymptoms] = useState<Symptom[]>(() => {
    const stored = localStorage.getItem('hridaymitra_symptoms');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('hridaymitra_health_records', JSON.stringify(healthRecords));
  }, [healthRecords]);

  useEffect(() => {
    localStorage.setItem('hridaymitra_symptoms', JSON.stringify(symptoms));
  }, [symptoms]);

  const addHealthRecord = (record: Omit<HealthRecord, 'id'>) => {
    const newRecord = { ...record, id: crypto.randomUUID() };
    setHealthRecords(prev => [...prev, newRecord]);
  };

  const addSymptom = (symptom: Omit<Symptom, 'id'>) => {
    const newSymptom = { ...symptom, id: crypto.randomUUID() };
    setSymptoms(prev => [...prev, newSymptom]);
  };

  const getRecentHeartRates = () => {
    return healthRecords
      .filter(r => r.heartRate)
      .slice(-7)
      .map(r => ({ date: r.date, value: r.heartRate! }));
  };

  const getRecentBloodPressure = () => {
    return healthRecords
      .filter(r => r.bloodPressureSystolic && r.bloodPressureDiastolic)
      .slice(-7)
      .map(r => ({ 
        date: r.date, 
        systolic: r.bloodPressureSystolic!, 
        diastolic: r.bloodPressureDiastolic! 
      }));
  };

  const getRecentBloodSugar = () => {
    return healthRecords
      .filter(r => r.bloodSugar)
      .slice(-7)
      .map(r => ({ date: r.date, value: r.bloodSugar! }));
  };

  const getRecentWeight = () => {
    return healthRecords
      .filter(r => r.weight)
      .slice(-7)
      .map(r => ({ date: r.date, value: r.weight! }));
  };

  return (
    <HealthDataContext.Provider value={{
      healthRecords,
      symptoms,
      addHealthRecord,
      addSymptom,
      getRecentHeartRates,
      getRecentBloodPressure,
      getRecentBloodSugar,
      getRecentWeight,
    }}>
      {children}
    </HealthDataContext.Provider>
  );
}

function generateSampleData(): HealthRecord[] {
  const today = new Date();
  const records: HealthRecord[] = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    records.push({
      id: crypto.randomUUID(),
      date: date.toISOString().split('T')[0],
      heartRate: Math.floor(Math.random() * 20) + 68,
      bloodPressureSystolic: Math.floor(Math.random() * 15) + 115,
      bloodPressureDiastolic: Math.floor(Math.random() * 10) + 75,
      bloodSugar: Math.floor(Math.random() * 20) + 90,
      weight: Math.floor(Math.random() * 3) + 70,
    });
  }
  
  return records;
}

export function useHealthData() {
  const context = useContext(HealthDataContext);
  if (context === undefined) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
}
