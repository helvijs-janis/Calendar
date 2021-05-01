/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { CalendarDataProvider } from './components/CalendarDataContext';

ReactDOM.render(
  <ErrorBoundary>
    {/* <CalendarDataProvider> */}
    <App />
    {/* </CalendarDataProvider> */}
  </ErrorBoundary>,
  document.getElementById('root'),
);
