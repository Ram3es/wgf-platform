import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { store } from '@store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './screens/app';

const persistor = persistStore(store);

Sentry.init({
  dsn: 'https://407c0ba1a8c94e33aeb6c3fcfdcb7be4@o542719.ingest.sentry.io/6090970',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
          <App />
        </Sentry.ErrorBoundary>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
