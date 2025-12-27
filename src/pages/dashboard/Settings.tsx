import React from 'react';
import { Settings as SettingsIcon, Moon, Sun, Bell, FileDown, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        { icon: theme === 'dark' ? Sun : Moon, label: 'Dark Theme', action: toggleTheme, toggle: true, value: theme === 'dark' },
        { icon: Bell, label: 'Notifications', action: () => {}, toggle: true, value: true },
      ]
    },
    {
      title: 'Data',
      items: [
        { icon: FileDown, label: 'Export Health Data', action: () => {} },
      ]
    },
    {
      title: 'Legal',
      items: [
        { icon: Shield, label: 'Privacy Policy', action: () => {} },
        { icon: HelpCircle, label: 'Help & Support', action: () => {} },
      ]
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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

      {settingsGroups.map(group => (
        <div key={group.title} className="glass-card p-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">{group.title}</h2>
          <div className="space-y-1">
            {group.items.map(item => (
              <button key={item.label} onClick={item.action} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{item.label}</span>
                </div>
                {item.toggle && (
                  <div className={`w-11 h-6 rounded-full transition-colors ${item.value ? 'bg-primary' : 'bg-muted'}`}>
                    <div className={`w-5 h-5 rounded-full bg-background shadow-md transition-transform mt-0.5 ${item.value ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}

      <Button variant="destructive" className="w-full" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />Sign Out
      </Button>
    </div>
  );
}
