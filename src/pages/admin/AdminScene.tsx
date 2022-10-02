import '#styles/admin/index.css';

import { Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '#components';
import { useDocumentTitle } from '#hooks';
import { NoMatch } from '#pages/NoMatch';

import { Admin } from './Admin';

const AdminScene = () => {
  useDocumentTitle('Admin');

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AdminScene;
