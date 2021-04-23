import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { RoomProvider } from './components/RoomContext';

ReactDOM.render(
  <ErrorBoundary>
    <RoomProvider>
      <App />
    </RoomProvider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
