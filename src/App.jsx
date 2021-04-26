import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Grid, Row, Column } from 'carbon-components-react';
import EventCalendar from './components/EventCalendar';
import HeaderBaseWActions from './components/Header';
import TopFilter from './components/TopFilter';
import { RoomsProvider } from './components/RoomContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoomsProvider>
        <HeaderBaseWActions />
        <Grid fullWidth>
          <Row>
            <Column lg={2} />
            <Column lg={10}>
              <TopFilter />
              <EventCalendar />
            </Column>
          </Row>
        </Grid>
      </RoomsProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
