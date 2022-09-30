import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

import { Spinner } from '#components';

/**
 * If a `returnTo` value is provided in `appState` when calling `loginWithRedirect`,
 * the current path `/auth0/login` will be replaced by `returnTo` before this component is rendered.
 * Therefore, this component only exists in case the `returnTo` value is missing.
 */

export const LoginCallback = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <Spinner />;

  return <Navigate to="/" />;
};
