import React, { useState, useCallback } from "react";
import { Grid, Row, Column } from "carbon-components-react";
import { useHistory } from "react-router-dom";
import EventCalendar from "../components/EventCalendar";
import HeaderBaseWActions from "../components/Header";
import Sidebar from "../components/Sidebar";
import TopFilter from "../components/TopFilter";
import { fetchBuildings } from "../queries/RoomQueries";
import ModalCreateForm from "../components/ModalCreateForm";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [dateInfo, setDateInfo] = useState({});
  const buildingsQuery = fetchBuildings();

  const history = useHistory();
  const navigateToCreate = useCallback(
    () => history.push("/create"),
    [history]
  );

  return buildingsQuery.isLoading ? (
    "Loading..."
  ) : (
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
      {Object.keys(dateInfo).length > 0 && (
        <ModalCreateForm
          open={open}
          setOpen={setOpen}
          navigateToCreate={navigateToCreate}
          dateInfo={dateInfo}
          buildings={buildingsQuery.data}
        />
      )}
    </>
  );
}
