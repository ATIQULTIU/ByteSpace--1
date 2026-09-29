import { useEffect, useState } from 'react';
import { useHashRoute, navigate } from './hooks/useHashRoute.js';
import { SESSION_KEY, endSession, getSession } from './lib/auth.js';
import Landing from './pages/Landing.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

const PAGES = new Set(['login', 'signup', 'dashboard']);

export default function App() {
  const route = useHashRoute();
  const [user, setUser] = useState(getSession);

  // Keep the session in sync across browser tabs.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === SESSION_KEY || e.key === null) setUser(getSession());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Decide what to show (route guards).
  let view = PAGES.has(route) ? route : 'landing';
  if (view === 'dashboard' && !user) view = 'login';
  if ((view === 'login' || view === 'signup') && user) view = 'dashboard';

  // Make the URL match the guarded view (replace, so Back doesn't loop).
  useEffect(() => {
    if (PAGES.has(route) && view !== route) navigate(view, { replace: true });
  }, [route, view]);

  // Scroll to the requested section (or top) after each navigation.
  useEffect(() => {
    const target = view === 'landing' ? document.getElementById(route) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [route, view]);

  const handleAuth = (nextUser) => {
    setUser(nextUser);
    navigate('dashboard');
  };

  const handleLogout = () => {
    endSession();
    setUser(null);
    navigate('home');
  };

  if (view === 'login' || view === 'signup') {
    // `key` resets the form when switching between Sign in and Sign up.
    return <AuthPage key={view} mode={view} onAuth={handleAuth} />;
  }
  if (view === 'dashboard') return <DashboardPage user={user} onLogout={handleLogout} />;
  return <Landing user={user} onLogout={handleLogout} />;
}
