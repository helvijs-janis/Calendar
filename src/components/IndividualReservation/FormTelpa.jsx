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
import {
  httpGet,
  handleSelectEka,
  handleSelectTelpa,
} from './FormFunctions';

export default function FormTelpa() {
  const [currentItem, setCurrentItem] = useState();
  return (
    <Grid>
      <Row>
        <Column size={4}>
          <FormGroup>
            <Dropdown
              required
              id="default"
              titleText="Ēka"
              label="Dropdown menu options"
              items={httpGet('https://tone.id.lv/api/buildings')}
              itemToString={(item) => (item ? item.title : '')}
              onChange={handleSelectEka}
            />
          </FormGroup>
          <p>{setCurrentItem.value}</p>
          <div>{}</div>
        </Column>
        <Column size={1} />
        <Column size={4}>
          <FormGroup>
            <Dropdown
              id="TelpasIevade"
              required
              titleText="Telpa"
              label="Dropdown menu options"
              items={httpGet('https://tone.id.lv/api/rooms')}
              itemToString={(item) => (item ? item.title : '')}
              onChange={handleSelectTelpa}
            />
          </FormGroup>
        </Column>
        <Column size={1} />
      </Row>
    </Grid>
  );
}
