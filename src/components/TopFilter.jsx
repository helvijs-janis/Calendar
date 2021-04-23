import { useState, React } from 'react';
import {
  Grid, Row, Column, Accordion, AccordionItem, Dropdown, TextInput,
} from 'carbon-components-react';
import useFetch from '../services/useFetch';
import Spinner from '../Spinner';

const TopFilter = () => {
  const { data: items, loading, error } = useFetch(
    'rooms',
  );
  const [currentItem, setCurrentItem] = useState();

  if (error) throw error;
  if (loading) return <Spinner />;

  return (
    <Accordion>
      <AccordionItem title="Pasākuma filtri">
        <Grid>
          <Row>
            <Column lg={4}>
              <div>
                <Dropdown
                  id="default"
                  titleText="Studiju programma"
                  label="Ģeogrāfija"
                  items={items}
                  itemToString={(item) => (item ? item.shortname : '')}
                  onChange={({ selectedItem }) => setCurrentItem(selectedItem)}
                  selectedItem={currentItem}
                />
              </div>
            </Column>
            <Column lg={4}>
              <div>
                <Dropdown
                  id="default"
                  titleText="Kurss"
                  label="1."
                  items={items}
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
