import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { HealthDataProvider } from "@/contexts/HealthDataContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import HealthAssessment from "./pages/dashboard/HealthAssessment";
import HeartRateMeasure from "./pages/dashboard/HeartRateMeasure";
import Tracker from "./pages/dashboard/Tracker";
import Articles from "./pages/dashboard/Articles";
import SymptomsTracker from "./pages/dashboard/SymptomsTracker";
import FindDoctors from "./pages/dashboard/FindDoctors";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <HealthDataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="assessment" element={<HealthAssessment />} />
                  <Route path="heart-rate" element={<HeartRateMeasure />} />
                  <Route path="tracker" element={<Tracker />} />
                  <Route path="articles" element={<Articles />} />
                  <Route path="symptoms" element={<SymptomsTracker />} />
                  <Route path="find-doctors" element={<FindDoctors />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </HealthDataProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
