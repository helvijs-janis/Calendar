import { useState, React } from 'react';
import {
  Grid, Row, Column, Accordion, AccordionItem, Dropdown, TextInput,
} from 'carbon-components-react';
import { fetchFaculties } from '../queries/RoomQueries';
import { useReservationContext } from './ReservationContext';

let initialFaculties;
try {
  initialFaculties = JSON.parse(localStorage.getItem('faculties')) ?? [];
} catch {
  initialFaculties = [];
}

const options = initialFaculties;
options.splice(0, 0, {
  id: 0,
  fullname: 'Visas fakultātes',
});
console.log(options);

const TopFilter = () => {
  const { setSelectedFaculty } = useReservationContext();
  const items = fetchFaculties();
  const [currentItem, setCurrentItem] = useState(options[0]);

  return items.isLoading ? (
    'Loading...'
  ) : (
    <Accordion>
      <AccordionItem title="Pasākuma filtri">
        <Grid>
          <Row>
            <Column lg={6}>
              <div>
                <Dropdown
                  id="default"
                  titleText="Fakultāte"
                  label="Izvēlieties fakultāti"
                  light
                  items={options}
                  itemToString={(item) => (item ? item.fullname : '')}
                  onChange={({ selectedItem }) => {
                    setCurrentItem(selectedItem);
                    setSelectedFaculty(selectedItem.id);
                  }}
                  selectedItem={currentItem}
                />
              </div>
            </Column>
            <Column lg={2}>
              <div>
                <Dropdown
                  id="default"
                  titleText="Kurss"
                  label="1."
                  light
                  items={items.data}
                  itemToString={(item) => (item ? item.shortname : '')}
                  onChange={({ selectedItem }) => setCurrentItem(selectedItem)}
                />
              </div>
            </Column>
            <Column lg={4}>
              <div>
                <TextInput
                  id="text-input-1"
                  labelText="Priekšmets"
                  placeholder="Praktiskā ekoloģija"
                />
              </div>
            </Column>
          </Row>
        </Grid>
      </AccordionItem>
    </Accordion>
  );
};

export default TopFilter;
