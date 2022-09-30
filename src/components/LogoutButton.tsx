import { useAuth0 } from '@auth0/auth0-react';

import { Button } from '#components';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout()} variant="tertiary" danger>
      Log Out
    </Button>
  );
};
