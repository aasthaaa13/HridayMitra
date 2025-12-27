import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, 
  Activity, 
  FileHeart, 
  TrendingUp, 
  MapPin, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Fingerprint,
  Stethoscope,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { AIAssistant } from '@/components/dashboard/AIAssistant';

const menuItems = [
  { icon: Activity, label: 'Dashboard', path: '/dashboard' },
  { icon: Fingerprint, label: 'Measure Heart Rate', path: '/dashboard/heart-rate' },
  { icon: FileHeart, label: 'Health Assessment', path: '/dashboard/assessment' },
  { icon: TrendingUp, label: 'Tracker', path: '/dashboard/tracker' },
  { icon: BookOpen, label: 'Articles', path: '/dashboard/articles' },
  { icon: Stethoscope, label: 'Symptoms Tracker', path: '/dashboard/symptoms' },
  { icon: MapPin, label: 'Find Doctors', path: '/dashboard/find-doctors' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const healthTips = [
  "💡 Tip: 30 minutes of daily walking can reduce heart disease risk by 35%",
  "🥗 Tip: Eating 5 servings of fruits and vegetables daily supports heart health",
  "💤 Tip: 7-8 hours of sleep helps maintain healthy blood pressure",
  "🧘 Tip: Regular meditation can lower stress hormones that affect your heart",
  "🚰 Tip: Staying hydrated helps your heart pump blood more efficiently",
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Time for your daily health check!', read: false },
    { id: 2, message: 'Your weekly health report is ready', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (!user) {
      navigate('/auth?mode=login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips.length);
    }, 5000);
    return () => clearInterval(tipInterval);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-card border-r border-border z-50
          transition-all duration-300 flex flex-col
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-heart-red heartbeat flex-shrink-0" fill="currentColor" />
            {sidebarOpen && (
              <span className="text-xl font-heading font-bold bg-gradient-hero bg-clip-text text-transparent">
                HridayMitra
              </span>
            )}
          </div>
          <button
            className="hidden lg:block p-1 text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ChevronRight className={`h-5 w-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
          <button
            className="lg:hidden p-1 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }
                `}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center gap-3 ${sidebarOpen ? '' : 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-primary font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className={`w-full mt-4 text-muted-foreground hover:text-destructive ${!sidebarOpen ? 'px-2' : ''}`}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border z-30">
          {/* Health Tips Ticker */}
          <div className="bg-primary/5 border-b border-border px-4 py-2 overflow-hidden">
            <div className="flex items-center gap-2 text-sm text-primary animate-fade-in" key={currentTip}>
              <span className="whitespace-nowrap">{healthTips[currentTip]}</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Greeting */}
            <div className="hidden md:block">
              <h1 className="text-xl font-heading font-bold text-foreground">
                {getGreeting()}, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                Here's your health overview for today
              </p>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2 text-muted-foreground hover:text-foreground relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-6 w-6" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-heart-red rounded-full" />
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 glass-card p-4 animate-fade-in">
                    <h3 className="font-semibold mb-3">Notifications</h3>
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className={`p-3 rounded-lg mb-2 ${notif.read ? 'bg-muted/50' : 'bg-primary/10'}`}
                      >
                        <p className="text-sm">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* AI Assistant */}
              <AIAssistant />

              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-primary font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
