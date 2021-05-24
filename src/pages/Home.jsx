import React, { useState, useCallback } from 'react';
import { Grid, Row, Column } from 'carbon-components-react';
import { useHistory } from 'react-router-dom';
import EventCalendar from '../components/EventCalendar';
import HeaderBaseWActions from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopFilter from '../components/TopFilter';
import Modal from '../components/Modal';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [dateInfo, setDateInfo] = useState({});

  const history = useHistory();
  const navigateToCreate = useCallback(() => history.push('/create'), [history]);

  return (
    <>
      <HeaderBaseWActions />
      <Sidebar />
      <Grid fullWidth>
        <Row>
          <Column lg={2} />
          <Column lg={10}>
            <TopFilter />
            <EventCalendar setOpen={setOpen} setDateInfo={setDateInfo} />
          </Column>
        </Row>
      </Grid>
      <Modal
        open={open}
        setOpen={setOpen}
        navigateToCreate={navigateToCreate}
        dateInfo={dateInfo}
      />
    </>
  );
}
