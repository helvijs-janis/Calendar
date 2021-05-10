/* eslint-disable no-unused-vars */
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Grid, Row, Column } from 'carbon-components-react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Create from './pages/Create';
import EventCalendar from './components/EventCalendar';
import HeaderBaseWActions from './components/Header';
import Sidebar from './components/Sidebar';
import TopFilter from './components/TopFilter';
import { RoomsProvider } from './components/RoomContext';
import { ReservationsProvider } from './components/ReservationContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReservationsProvider>
        <RoomsProvider>
          <Route exact path="/"><Home /></Route>
          <Route path="/list"><List /></Route>
          <Route path="/create"><Create /></Route>
        </RoomsProvider>
      </ReservationsProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
