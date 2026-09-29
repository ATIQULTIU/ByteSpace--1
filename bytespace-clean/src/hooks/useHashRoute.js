import { useSyncExternalStore } from 'react';

export const getRoute = () => window.location.hash.replace(/^#\/?/, '') || 'home';

function subscribe(callback) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

/**
 * Re-renders the component whenever the URL hash changes.
 *
 * The original app read `location.hash` once at startup, so clicking
 * "Sign in" updated the URL but never displayed the login page.
 */
export function useHashRoute() {
  return useSyncExternalStore(subscribe, getRoute, () => 'home');
}

export function navigate(route, { replace = false } = {}) {
  if (replace) window.location.replace(`#${route}`);
  else window.location.hash = route;
}
