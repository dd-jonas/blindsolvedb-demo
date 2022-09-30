import { useAuth0 } from '@auth0/auth0-react';

import { Button } from '#components';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          appState: {
            returnTo: window.location.pathname + window.location.search,
          },
        })
      }
    >
      Log in
    </Button>
  );
};
