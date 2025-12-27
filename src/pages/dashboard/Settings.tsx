import React, { useState, useRef } from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  FileDown, 
  Shield, 
  HelpCircle, 
  LogOut,
  User,
  Camera,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useHealthData } from '@/contexts/HealthDataContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, updateAvatar } = useAuth();
  const { healthRecords, symptoms } = useHealthData();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => { 
    logout(); 
    navigate('/'); 
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: 'File too large', description: 'Please select an image under 5MB', variant: 'destructive' });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        updateAvatar(base64);
        toast({ title: 'Profile picture updated successfully' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    updateAvatar('');
    toast({ title: 'Profile picture removed' });
  };

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      user: { name: user?.name, email: user?.email },
      healthRecords,
      symptoms
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hridaymitra-health-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({ title: 'Health data exported successfully' });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center">
            <SettingsIcon className="h-7 w-7 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your preferences</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold text-muted-foreground mb-4">Profile</h2>
        
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div 
              className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-colors"
              onClick={handleAvatarClick}
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-primary" />
              )}
            </div>
            <button 
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          <div className="flex-1">
            <p className="font-semibold text-lg">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            {user?.avatar && (
              <button 
                onClick={handleRemoveAvatar}
                className="text-sm text-destructive hover:underline mt-2 flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Remove picture
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">Preferences</h2>
        <div className="space-y-1">
          <button 
            onClick={toggleTheme} 
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Sun className="h-5 w-5 text-muted-foreground" /> : <Moon className="h-5 w-5 text-muted-foreground" />}
              <span>Dark Theme</span>
            </div>
            <div className={`w-11 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-5 h-5 rounded-full bg-background shadow-md transition-transform mt-0.5 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
          </button>
          
          <button 
            onClick={() => setNotifications(!notifications)} 
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span>Notifications</span>
            </div>
            <div className={`w-11 h-6 rounded-full transition-colors ${notifications ? 'bg-primary' : 'bg-muted'}`}>
              <div className={`w-5 h-5 rounded-full bg-background shadow-md transition-transform mt-0.5 ${notifications ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Data */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">Data</h2>
        <button 
          onClick={handleExportData}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
        >
          <div className="flex items-center gap-3">
            <FileDown className="h-5 w-5 text-muted-foreground" />
            <span>Export Health Data</span>
          </div>
        </button>
      </div>

      {/* Legal */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">Legal</h2>
        <div className="space-y-1">
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span>Privacy Policy</span>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              <span>Help & Support</span>
            </div>
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <Button variant="destructive" className="w-full" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>

      {/* Medical Disclaimer */}
      <div className="p-4 bg-muted/50 rounded-xl text-center">
        <p className="text-xs text-muted-foreground">
          <strong>Medical Disclaimer:</strong> HridayMitra provides AI-assisted health predictions and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.
        </p>
      </div>
    </div>
  );
}
