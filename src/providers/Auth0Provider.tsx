import { Auth0Provider as Provider } from '@auth0/auth0-react';
import { FC } from 'react';

import { Alert } from '#components';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const redirectUri = `${window.location.origin}/auth0/login`;

export const Auth0Provider: FC = ({ children }) => {
  if (!domain || !clientId)
    return (
      <Alert danger style={{ margin: 'var(--size-4)' }}>
        Something went wrong
      </Alert>
    );

  return (
    <Provider
      domain={`${domain}`}
      clientId={`${clientId}`}
      audience={`${audience}`}
      redirectUri={redirectUri}
    >
      {children}
    </Provider>
  );
};
