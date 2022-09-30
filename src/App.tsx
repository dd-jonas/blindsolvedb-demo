import { useAuth0 } from '@auth0/auth0-react';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

import { Alert, NavBar, Spinner, ToastIcon } from '#components';
import { useSupportedFeatures } from '#hooks';
import { NoMatch } from '#pages/NoMatch';
import { SettingsProvider } from '#providers';

const Home = lazy(() => import('#pages/home/Home'));
const AuthScene = lazy(() => import('#pages/auth/AuthScene'));
const SheetsScene = lazy(() => import('#pages/sheets/SheetsScene'));
const TrainerScene = lazy(() => import('#pages/trainer/TrainerScene'));
const ProfileScene = lazy(() => import('#pages/profile/ProfileScene'));
const AdminScene = lazy(() => import('#pages/admin/AdminScene'));

const App = () => {
  const { isLoading } = useAuth0();
  const { isChecking, isSupported } = useSupportedFeatures();

  if (isLoading || isChecking) return <Spinner />;

  if (!isSupported) {
    return (
      <Alert danger style={{ margin: 'var(--size-4)' }}>
        Some features are not supported by your browser. Please switch to a
        Chromium browser or Firefox.
      </Alert>
    );
  }

  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>

      <main>
        <SettingsProvider>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth0/*" element={<AuthScene />} />
              <Route path="/sheets/*" element={<SheetsScene />} />
              <Route path="/trainer/*" element={<TrainerScene />} />
              <Route path="/profile/*" element={<ProfileScene />} />
              <Route path="/admin/*" element={<AdminScene />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Suspense>
        </SettingsProvider>
      </main>

      <ToastContainer
        position="bottom-right"
        closeButton={false}
        limit={5}
        theme="colored"
        icon={<ToastIcon />}
        transition={Slide}
      />
    </BrowserRouter>
  );
};

export default App;
