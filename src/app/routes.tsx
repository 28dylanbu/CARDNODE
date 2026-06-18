import { createBrowserRouter, Navigate } from 'react-router';
import Landing from './components/Landing';
import Auth from './components/Auth';
import MainDashboard from './components/MainDashboard';
import Dashboard from './components/Dashboard';
import StudySession from './components/StudySession';
import SessionComplete from './components/SessionComplete';
import EducationalHome from './components/EducationalHome';
import FlashCards from './components/FlashCards';
import Constructor from './components/Constructor';
import ProgressScreen from './components/ProgressScreen';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';
import VerbEditor from './components/VerbEditor';
import { getCurrentUser } from './utils/auth';

const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/auth" replace />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }

  const user = getCurrentUser();
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/auth',
    Component: Auth,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <MainDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/old-dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/study/:deckId',
    element: (
      <ProtectedRoute>
        <StudySession />
      </ProtectedRoute>
    ),
  },
  {
    path: '/complete/:deckId',
    element: (
      <ProtectedRoute>
        <SessionComplete />
      </ProtectedRoute>
    ),
  },
  {
    path: '/educational-home',
    element: (
      <ProtectedRoute>
        <EducationalHome />
      </ProtectedRoute>
    ),
  },
  {
    path: '/learn',
    element: (
      <ProtectedRoute>
        <FlashCards />
      </ProtectedRoute>
    ),
  },
  {
    path: '/constructor',
    element: (
      <ProtectedRoute>
        <Constructor />
      </ProtectedRoute>
    ),
  },
  {
    path: '/progress',
    element: (
      <ProtectedRoute>
        <ProgressScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminPanel />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/verb/:verbId',
    element: (
      <AdminRoute>
        <VerbEditor />
      </AdminRoute>
    ),
  },
]);
