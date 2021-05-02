import React, { useState } from 'react';
import { Add16 } from '@carbon/icons-react';
import {
  SideNav,
  SideNavItems,
} from 'carbon-components-react/lib/components/UIShell';
import {
  Dropdown, Button, Checkbox, NumberInput,
} from 'carbon-components-react';
import { useFilterRooms } from './RoomContext';
import { fetchBuildings } from '../queries/RoomQueries';

let initialBuildings;
try {
  initialBuildings = JSON.parse(localStorage.getItem('buildings')) ?? [];
} catch {
  initialBuildings = [];
}

const options = initialBuildings;
options.splice(0, 0, {
  id: 4,
  title: 'Visas ēkas',
});

const Sidebar = () => {
  const {
    setSelectedOccupancy,
    setHideRoomsWithoutLargeBlackboard,
    setHideRoomsWithoutChalkBlackboard,
    setHideRoomsWithoutComputers,
    setHideRoomsWithoutProjector,
  } = useFilterRooms();

  const { setSelectedBuildingOptions } = useFilterRooms();
  const items = fetchBuildings();
  const [currentItem, setCurrentItem] = useState(options[0]);

  const [currentOccupancy, setCurrentOccupancy] = useState(50);
  const [isCheckedLargeBlackboard, setIsCheckedLargeBlackboard] = useState(false);
  const [isCheckedChalkBlackboard, setIsCheckedChalkBlackboard] = useState(false);
  const [isCheckedComputers, setIsCheckedComputers] = useState(false);
  const [isCheckedProjector, setIsCheckedProjector] = useState(false);

  return items.isLoading ? (
    'Loading...'
  ) : (
    <SideNav aria-label="Side navigation">
      <SideNavItems>
        <div className="demo-app-sidebar-section">
          <Button className="izveidot-button" renderIcon={Add16} iconDescription="Add">Izveidot</Button>
        </div>
        <div className="demo-app-sidebar-section">
          <h4 style={{ fontWeight: 'bold' }}>Telpu filtri</h4>
        </div>
        <div className="demo-app-sidebar-section">
          <div style={{ width: 200 }}>
            <Dropdown
              id="default"
              titleText="Ēka"
              label="Izvēlieties ēku"
              items={options}
              itemToString={(item) => (item ? item.title : '')}
              onChange={({ selectedItem }) => {
                setCurrentItem(selectedItem);
                setSelectedBuildingOptions(selectedItem.id);
              }}
              selectedItem={currentItem}
            />
          </div>
        </div>
        <div className="demo-app-sidebar-section">
          <Checkbox labelText="Nerādīt telpas, kas ir aizņemtas tuvāko 2 stundu laikā" id="checkbox-label-1" />
        </div>
        <div className="demo-app-sidebar-section">
          <NumberInput
            id="numberInput"
            min={0}
            max={500}
            value={currentOccupancy || 0}
            label="Ietilpība (studentu skaits)"
            invalidText="Number is not valid"
            step={50}
            onChange={(evt) => {
              const newValue = evt.imaginaryTarget.valueAsNumber;
              setCurrentOccupancy(newValue);
              setSelectedOccupancy(newValue);
            }}
          />
        </div>
        <div className="demo-app-sidebar-section">
          <legend>Telpas parametri</legend>
          <Checkbox
            labelText="XL tāfele"
            id="checkbox-label-2"
            checked={isCheckedLargeBlackboard}
            onChange={() => {
              setIsCheckedLargeBlackboard(!isCheckedLargeBlackboard);
              setHideRoomsWithoutLargeBlackboard(!isCheckedLargeBlackboard);
            }}
          />
          <Checkbox
            labelText="Krīta tāfele"
            id="checkbox-label-3"
            checked={isCheckedChalkBlackboard}
            onChange={() => {
              setIsCheckedChalkBlackboard(!isCheckedChalkBlackboard);
              setHideRoomsWithoutChalkBlackboard(!isCheckedChalkBlackboard);
            }}
          />
          <Checkbox
            labelText="Datori"
            id="checkbox-label-4"
            checked={isCheckedComputers}
            onChange={() => {
              setIsCheckedComputers(!isCheckedComputers);
              setHideRoomsWithoutComputers(!isCheckedComputers);
            }}
          />
          <Checkbox
            labelText="Projektors"
            id="checkbox-label-5"
            checked={isCheckedProjector}
            onChange={() => {
              setIsCheckedProjector(!isCheckedProjector);
              setHideRoomsWithoutProjector(!isCheckedProjector);
            }}
          />
        </div>
      </SideNavItems>
    </SideNav>
  );
};

export default Sidebar;
