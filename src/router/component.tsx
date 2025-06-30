import { DEFAULT_ROUTE, ROUTES } from './constants';
import { useRouter } from './hooks';

const Router = () => {
  const { currentRoute } = useRouter();

  return ROUTES[currentRoute] ?? ROUTES[DEFAULT_ROUTE];
};

export default Router;
