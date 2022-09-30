import '#styles/trainer/index.css';

import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';

import { ErrorBoundary, LoginMessage } from '#components';
import { useDocumentTitle } from '#hooks';
import { NoMatch } from '#pages/NoMatch';

import { TrainerDetail } from './detail/TrainerDetail';
import { TrainerOverview } from './overview/TrainerOverview';
import { LearnSession } from './session/LearnSession';
import { ReviewSession } from './session/ReviewSession';

const TrainerScene = () => {
  useDocumentTitle('Trainer');

  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <LoginMessage>Log in to use the trainer.</LoginMessage>;
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<TrainerOverview />} />
        <Route path=":setSlug" element={<TrainerDetail />} />
        <Route path=":setSlug/learn" element={<LearnSession />} />
        <Route path=":setSlug/review" element={<ReviewSession />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default TrainerScene;
