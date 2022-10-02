import '#styles/explorer/index.css';

import { Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '#components';
import { useDocumentTitle } from '#hooks';
import { NoMatch } from '#pages/NoMatch';

import { Explorer } from './Explorer';

const ExplorerScene = () => {
  useDocumentTitle('Explorer');

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Explorer />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default ExplorerScene;
