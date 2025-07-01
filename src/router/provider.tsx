import { useCallback, useEffect, useMemo, useState } from 'react';

import { RouterContext } from './context';

import type { Route } from './types';

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  // Get initial route from URL or default to 'layer-manager'
  const getInitialRoute = (): Route => {
    const path = window.location.pathname.substring(1);
    return (path as Route) ?? 'layer-manager';
  };

  const [currentRoute, setCurrentRoute] = useState<Route>(getInitialRoute);

  const navigate = useCallback((route: Route) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', `/${route}`);
  }, []);

  // Handle browser back/forward navigation
  // Updates internal route state when user navigates via browser buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };

    window.addEventListener('popstate', handlePopState);
    // Cleanup listener to prevent memory leaks
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Redirect to layer-manager if we're at the root path
  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('layer-manager');
    }
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      currentRoute,
      navigate,
    }),
    [currentRoute, navigate],
  );

  return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>;
};
