import '#styles/profile/index.css';

import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '#components';
import { useDocumentTitle } from '#hooks';
import { NoMatch } from '#pages/NoMatch';

import { Profile } from './Profile';

const ProfileScene = () => {
  useDocumentTitle('Profile');

  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default ProfileScene;
