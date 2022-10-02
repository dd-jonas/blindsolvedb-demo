import '#styles/profile/index.css';

import { Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '#components';
import { useDocumentTitle } from '#hooks';
import { NoMatch } from '#pages/NoMatch';

import { Profile } from './Profile';

const ProfileScene = () => {
  useDocumentTitle('Profile');

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
