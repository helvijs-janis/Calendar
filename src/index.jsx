import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root'),
);
