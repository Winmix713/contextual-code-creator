import React, { Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useFeatureFlags } from '@/providers/FeatureFlagsProvider';
import PageLoading from '@/components/ui/PageLoading';
import AppLayout from '@/components/layout/AppLayout';

// Public pages
import Index from '@/pages/Index';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import NotFound from '@/pages/NotFound';
import Unauthorized from '@/pages/Unauthorized';
import FeatureFlagsDemo from '@/pages/FeatureFlagsDemo';

// Lazy loaded pages
const PredictionsView = React.lazy(() => import('@/pages/PredictionsView'));
const MatchesPage = React.lazy(() => import('@/pages/MatchesPage'));
const MatchDetail = React.lazy(() => import('@/pages/MatchDetail'));
const Teams = React.lazy(() => import('@/pages/Teams'));
const TeamDetail = React.lazy(() => import('@/pages/TeamDetail'));
const Leagues = React.lazy(() => import('@/pages/Leagues'));
const AIChat = React.lazy(() => import('@/pages/AIChat'));

// Protected / Advanced Features
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const NewPredictions = React.lazy(() => import('@/pages/NewPredictions'));
const CrossLeague = React.lazy(() => import('@/pages/CrossLeague'));
const Analytics = React.lazy(() => import('@/pages/Analytics'));
const ModelsPage = React.lazy(() => import('@/pages/ModelsPage'));
const MonitoringPage = React.lazy(() => import('@/pages/MonitoringPage'));
const PredictionAnalyzerPage = React.lazy(() => import('@/pages/PredictionAnalyzerPage'));
const Phase9 = React.lazy(() => import('@/pages/Phase9'));

// Admin Pages
const AdminDashboard = React.lazy(() => import('@/pages/admin/AdminDashboard'));
const UsersPage = React.lazy(() => import('@/pages/admin/users/UsersPage'));
const RunningJobsPage = React.lazy(() => import('@/pages/admin/jobs/RunningJobsPage'));
const Phase9SettingsPage = React.lazy(() => import('@/pages/admin/phase9/Phase9SettingsPage'));
const HealthDashboard = React.lazy(() => import('@/pages/admin/HealthDashboard'));
const IntegrationsPage = React.lazy(() => import('@/pages/admin/IntegrationsPage'));
const StatsPage = React.lazy(() => import('@/pages/admin/StatsPage'));
const ModelStatusDashboard = React.lazy(() => import('@/pages/admin/ModelStatusDashboard'));
const FeedbackInboxPage = React.lazy(() => import('@/pages/admin/FeedbackInboxPage'));
const PredictionReviewPage = React.lazy(() => import('@/pages/admin/PredictionReviewPage'));
const EnvVariables = React.lazy(() => import('@/pages/EnvVariables'));
const ScheduledJobsPage = React.lazy(() => import('@/pages/ScheduledJobsPage'));

// WinmixPro
const WinmixProLayout = React.lazy(() => import('@/winmixpro/WinmixProLayout'));

// --- Layout Wrappers ---

// 1. Layout for pages with Sidebar (Main App)
const MainLayoutWrapper = () => {
  return (
    <AppLayout showSidebar={true}>
      <Suspense fallback={<PageLoading message="Betöltés..." />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
};

// 2. Layout for Public pages (Landing, Auth) - No Sidebar usually, or optional
const PublicLayoutWrapper = ({ sidebar = false }: { sidebar?: boolean }) => {
  return (
    <AppLayout showSidebar={sidebar}>
      <Suspense fallback={<PageLoading message="Betöltés..." />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
};

// 3. Security Wrapper
const ProtectedRoute = ({ requiredRoles = [] }: { requiredRoles?: string[] }) => {
  const { user, loading, hasAnyRole } = useAuth();

  if (loading) return <PageLoading message="Jogosultságok ellenőrzése..." />;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles as any)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

const AppRoutes: React.FC = () => {
  const { isEnabled } = useFeatureFlags();

  return (
    <Routes>
      {/* --- Public Routes (No Sidebar) --- */}
      <Route element={<PublicLayoutWrapper sidebar={false} />}>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/feature-flags" element={<FeatureFlagsDemo />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* --- Public/Shared Routes (With Sidebar) --- */}
      <Route element={<MainLayoutWrapper />}>
        <Route path="/predictions" element={<PredictionsView />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/match/:id" element={<MatchDetail />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamName" element={<TeamDetail />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/winmixpro" element={<WinmixProLayout />} />
        
        {/* --- Protected Routes (Authenticated Users) --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predictions/new" element={<NewPredictions />} />
          
          {/* Phase 5 */}
          {isEnabled('phase5') && (
             <Route path="/patterns" element={<div>Phase 5 Pattern Detection</div>} />
          )}

          {/* Phase 6 */}
          {isEnabled('phase6') && (
             <Route path="/models" element={<ModelsPage />} />
          )}

          {/* Phase 7 */}
          {isEnabled('phase7') && (
             <Route path="/crossleague" element={<CrossLeague />} />
          )}

          {/* Phase 8 */}
          {isEnabled('phase8') && (
            <>
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/prediction-analyzer" element={<PredictionAnalyzerPage />} />
            </>
          )}

          {/* Phase 9 */}
          {isEnabled('phase9') && (
             <Route path="/phase9" element={<Phase9 />} />
          )}
        </Route>

        {/* --- Admin Routes --- */}
        <Route element={<ProtectedRoute requiredRoles={['admin', 'analyst']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/jobs" element={<RunningJobsPage />} />
          <Route path="/admin/phase9" element={<Phase9SettingsPage />} />
          <Route path="/admin/health" element={<HealthDashboard />} />
          <Route path="/admin/stats" element={<StatsPage />} />
          <Route path="/admin/integrations" element={<IntegrationsPage />} />
          <Route path="/admin/model-status" element={<ModelStatusDashboard />} />
          <Route path="/admin/feedback" element={<FeedbackInboxPage />} />
          <Route path="/admin/predictions" element={<PredictionReviewPage />} />
          <Route path="/jobs" element={<ScheduledJobsPage />} /> {/* Legacy */}
          
          {isEnabled('phase8') && (
             <Route path="/admin/matches" element={<MatchesPage />} />
          )}
        </Route>

        {/* --- Super Admin Routes --- */}
        <Route element={<ProtectedRoute requiredRoles={['admin']} />}>
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/environment" element={<EnvVariables />} />
        </Route>

      </Route>
    </Routes>
  );
};

export default AppRoutes;
