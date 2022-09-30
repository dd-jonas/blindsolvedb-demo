import 'react-toastify/dist/ReactToastify.min.css';
import '#styles/main/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundary } from '#components';
import {
  Auth0Provider,
  OverlayProvider,
  QueryClientProvider,
} from '#providers';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Auth0Provider>
        <QueryClientProvider>
          <OverlayProvider>
            <App />
          </OverlayProvider>
        </QueryClientProvider>
      </Auth0Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
