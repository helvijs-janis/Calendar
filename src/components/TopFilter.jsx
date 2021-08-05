/* eslint-disable no-unused-vars */
import { useState, React } from 'react'
import {
  Grid,
  Row,
  Column,
  Accordion,
  AccordionItem,
  Dropdown,
  TextInput,
} from 'carbon-components-react'
import { fetchFaculties, useFaculties } from '../queries/RoomQueries'
import { useReservationContext } from './ReservationContext'

const courses = ['Visi', '1', '2', '3', '4', '5', '6']

const TopFilter = () => {
  const {
    setSelectedFaculty,
    setSelectedCourse,
    setSelectedSubject,
  } = useReservationContext()

  const faculties = useFaculties()

  const [currentFaculty, setCurrentFaculty] = useState()
  const [currentCourse, setCurrentCourse] = useState()
  const [currentSubject, setCurrentSubject] = useState('')

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
                  items={faculties.data}
                  itemToString={(item) => (item ? item.fullname : '')}
                  onChange={({ selectedItem }) => {
                    setCurrentFaculty(selectedItem)
                    setSelectedFaculty(selectedItem.id)
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
                    setCurrentCourse(selectedItem)
                    setSelectedCourse(selectedItem)
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
                    setCurrentSubject(event.target.value)
                    setSelectedSubject(event.target.value)
                  }}
                />
              </div>
            </Column>
          </Row>
        </Grid>
      </AccordionItem>
    </Accordion>
  )
}

export default TopFilter
