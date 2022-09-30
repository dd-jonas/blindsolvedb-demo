import '#styles/sheets/index.css';

import { Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '#components';
import { useDocumentTitle } from '#hooks';
import { NoMatch } from '#pages/NoMatch';

import { Case } from './case';
import { Categories } from './categories';
import { Set } from './set';
import { SetContext } from './SetContext';

const SheetsScene = () => {
  useDocumentTitle('Sheets');

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Categories />} />

        <Route path=":setSlug" element={<SetContext />}>
          <Route index element={<Set />} />
          <Route path=":caseSlug" element={<Case />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default SheetsScene;
