import { useAuth0 } from '@auth0/auth0-react';

import { Alert, LogoutButton } from '#components';

export const Account = () => {
  const { user } = useAuth0();

  return (
    <div className="account">
      {!user?.email_verified && (
        <Alert warning>
          A verification email has been sent to {user!.email}.
        </Alert>
      )}
      <LogoutButton />
    </div>
  );
};
