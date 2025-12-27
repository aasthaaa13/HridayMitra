import React from 'react';
import { MapPin, Phone, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const doctors = [
  { name: 'Dr. Priya Sharma', specialty: 'Cardiologist', rating: 4.9, distance: '1.2 km', available: true },
  { name: 'Dr. Rajesh Kumar', specialty: 'Heart Surgeon', rating: 4.8, distance: '2.5 km', available: true },
  { name: 'Dr. Anita Patel', specialty: 'Cardiologist', rating: 4.7, distance: '3.1 km', available: false },
  { name: 'Dr. Vikram Singh', specialty: 'Cardiac Specialist', rating: 4.9, distance: '4.0 km', available: true },
];

export default function FindDoctors() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center">
            <MapPin className="h-7 w-7 text-warning" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">Find Nearby Doctors</h1>
            <p className="text-muted-foreground">Cardiologists and hospitals near you</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 h-64 flex items-center justify-center bg-gradient-soft">
        <div className="text-center text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Map integration requires Google Maps API key</p>
          <p className="text-sm">Connect to Lovable Cloud to enable</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-heading font-semibold">Nearby Cardiologists</h2>
        {doctors.map((doc, i) => (
          <div key={i} className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">{doc.name.split(' ')[1][0]}</span>
              </div>
              <div>
                <p className="font-semibold">{doc.name}</p>
                <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning" fill="currentColor" />{doc.rating}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{doc.distance}</span>
                  <span className={`flex items-center gap-1 ${doc.available ? 'text-health-green' : 'text-destructive'}`}>
                    <Clock className="h-3 w-3" />{doc.available ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm"><Phone className="h-4 w-4 mr-1" />Call</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
