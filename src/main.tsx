import 'react-toastify/dist/ReactToastify.min.css';
import '#styles/main/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundary } from '#components';
import { OverlayProvider, QueryClientProvider } from '#providers';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider>
        <OverlayProvider>
          <App />
        </OverlayProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
