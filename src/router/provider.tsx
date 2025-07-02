import { useCallback, useEffect, useMemo, useState } from 'react';

import { RouterContext } from './context';

import type { Route } from './types';

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const getInitialRoute = (): Route => {
    const path = window.location.pathname.substring(1);
    return (path as Route) ?? 'layer-manager';
  };

  const [currentRoute, setCurrentRoute] = useState<Route>(getInitialRoute);

  const navigate = useCallback((route: Route) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', `/${route}`);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
