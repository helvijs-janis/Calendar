import React, { useEffect, useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query-devtools';
import { Grid, Row, Column } from 'carbon-components-react';
import EventCalendar from './components/EventCalendar';
import HeaderBaseWActions from './components/Header';
import TopFilter from './components/TopFilter';
import useFetch from './services/useFetch';
import Spinner from './Spinner';
import ReservationsReducer from './components/ReservationsReducer';

let initialReservations;
try {
  initialReservations = JSON.parse(localStorage.getItem('reservations')) ?? [];
} catch {
  initialReservations = [];
}

const queryClient = new QueryClient();

export default function App() {
  const { data: buildings, loading, error } = useFetch(
    'buildings',
  );

  const { data: rooms, loadingRooms, errorRooms } = useFetch(
    'rooms',
  );

  const { data: reservations, loadingReservations, errorReservations } = useFetch(
    'reservations',
  );

  useEffect(() => localStorage.setItem('buildings', JSON.stringify(buildings)), [buildings]);
  useEffect(() => localStorage.setItem('rooms', JSON.stringify(rooms)), [rooms]);
  useEffect(() => localStorage.setItem('reservations', JSON.stringify(reservations)), [reservations]);

  const [filteredReservations, dispatch2] = useReducer(ReservationsReducer, initialReservations);

  if (error || errorReservations || errorRooms) throw error;
  if (loading || loadingReservations || loadingRooms) return <Spinner />;

  return (
    <QueryClientProvider client={queryClient}>
      <HeaderBaseWActions dispatch2={dispatch2} />
      <Grid fullWidth>
        <Row>
          <Column lg={2} />
          <Column lg={10}>
            <TopFilter />
            <EventCalendar reservations={filteredReservations} />
          </Column>
        </Row>
      </Grid>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
