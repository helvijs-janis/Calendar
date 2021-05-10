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

const courses = ['Visi', '1', '2', '3', '4', '5'];

const TopFilter = () => {
  const { setSelectedFaculty, setSelectedCourse, setSelectedSubject } = useReservationContext();
  const faculties = fetchFaculties();

  const [currentFaculty, setCurrentFaculty] = useState(options[0]);
  const [currentCourse, setCurrentCourse] = useState(courses[0]);
  const [currentSubject, setCurrentSubject] = useState('');

  return faculties.isLoading ? (
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
                    setCurrentFaculty(selectedItem);
                    setSelectedFaculty(selectedItem.id);
                  }}
                  selectedItem={currentFaculty}
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
                  items={courses}
                  onChange={({ selectedItem }) => {
                    setCurrentCourse(selectedItem);
                    setSelectedCourse(selectedItem);
                  }}
                  selectedItem={currentCourse}
                />
              </div>
            </Column>
            <Column lg={4}>
              <div>
                <TextInput
                  id="text-input-1"
                  labelText="Priekšmets"
                  placeholder="Praktiskā ekoloģija"
                  value={currentSubject}
                  onChange={(event) => {
                    setCurrentSubject(event.target.value);
                    setSelectedSubject(event.target.value);
                  }}
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
