import React from 'react'
import EventCalendar from './components/EventCalendar'
import HeaderBaseWActions from './components/Header';
import TopFilter from './components/TopFilter';
import LeftSidebar from './components/LeftSidebar';
import CalendarSidebar from './components/CalendarSidebar'
import { Grid, Row, Column } from 'carbon-components-react';

function App() {
  return (
    <div>
      <HeaderBaseWActions />
      {/* <LeftSidebar /> */}
      <TopFilter />
      <Grid fullWidth>
        <Row>
          <Column lg={2}>
            <CalendarSidebar />
          </Column>
          <Column lg={10}>
            <EventCalendar />
          </Column>
        </Row>
      </Grid>
    </div>
  )
}

export default App;