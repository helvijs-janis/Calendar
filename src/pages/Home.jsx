import React from 'react';
import { Grid, Row, Column } from 'carbon-components-react';
import EventCalendar from '../components/EventCalendar';
import HeaderBaseWActions from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopFilter from '../components/TopFilter';

export default function Home() {
  return (
    <>
      <HeaderBaseWActions />
      <Sidebar />
      <Grid fullWidth>
        <Row>
          <Column lg={2} />
          <Column lg={10}>
            <TopFilter />
            <EventCalendar />
          </Column>
        </Row>
      </Grid>
    </>
  );
}
