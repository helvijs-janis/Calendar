import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Create from './pages/Create';
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
