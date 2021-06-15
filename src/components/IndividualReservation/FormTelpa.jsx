/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  React,
  useState,
} from 'react';
import {
  Grid,
  Row,
  Column,
  FormGroup,
  Dropdown,
} from 'carbon-components-react';
import { fetchBuildings, fetchRooms } from '../../queries/RoomQueries';

export default function FormTelpa({ setCurrentTelpa, setCurrentEka }) {
  const buildings = fetchBuildings();
  const rooms = fetchRooms();

  const [currentItem, setCurrentItem] = useState();
  return !rooms.isLoading && !buildings.isLoading && (
    <Grid>
      <Row>
        <Column size={5}>
          <FormGroup>
            <Dropdown
              required
              id="default"
              titleText="Ēka"
              label="Dropdown menu options"
              items={buildings.data}
              itemToString={(item) => (item ? item.title : '')}
              onChange={({ selectedItem }) => setCurrentEka(selectedItem)}
            />
          </FormGroup>
          <p>{setCurrentItem.value}</p>
          <div>{ }</div>
        </Column>
        <Column size={1} />
        <Column size={4}>
          <FormGroup>
            <Dropdown
              id="TelpasIevade"
              required
              titleText="Telpa"
              label="Dropdown menu options"
              items={rooms.data}
              itemToString={(item) => (item ? item.title : '')}
              onChange={({ selectedItem }) => setCurrentTelpa(selectedItem)}
            />
          </FormGroup>
        </Column>
        <Column size={1} />
      </Row>
    </Grid>
  );
}
