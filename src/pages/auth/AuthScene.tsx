import { Route, Routes } from 'react-router-dom';

import { NoMatch } from '#pages/NoMatch';

import { LoginCallback } from './LoginCallback';
import { LogoutCallback } from './LogoutCallback';

const AuthScene = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginCallback />} />
      <Route path="/logout" element={<LogoutCallback />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default AuthScene;
