/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import {
  Calendar32, Group32, UserAvatar32, Settings32, Add16,
} from '@carbon/icons-react';
import {
  useState, React,
} from 'react';
import {
  Header,
  HeaderName,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  HeaderContainer,
} from 'carbon-components-react/lib/components/UIShell';
import {
  Dropdown, Button, Checkbox, NumberInput,
} from 'carbon-components-react';
import { useFilterRooms } from './RoomContext';
import { fetchBuildings } from '../queries/RoomQueries';

const HeaderBaseWActions = () => {
  const { setSelectedBuildingOptions, setSelectedOccupancy } = useFilterRooms();
  const buildings = fetchBuildings();
  const [currentItem, setCurrentItem] = useState();
  const [currentOccupancy, setCurrentOccupancy] = useState(50);

  return buildings.isLoading ? (
    'Loading...'
  ) : (
    <HeaderContainer
      render={() => (
        <>
          <Header aria-label="LU">
            <HeaderName href="#" prefix="">
              LU
            </HeaderName>
            <HeaderMenuItem href="#"><Calendar32 /></HeaderMenuItem>
            <HeaderMenuItem href="#"><Group32 /></HeaderMenuItem>
            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="Search">
                <Settings32 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Notifications"
                tooltipAlignment="end"
              >
                <UserAvatar32 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
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
                      id="default-dropdown"
                      titleText="Ēka"
                      label="Izvēlieties ēku"
                      items={buildings.data}
                      itemToString={(item) => (item ? item.title : '')}
                      onChange={({ selectedItem }) => {
                        setCurrentItem(selectedItem);
                        setSelectedBuildingOptions([selectedItem.id]);
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
                    max={1000}
                    value={currentOccupancy}
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
                  <Checkbox labelText="XL tāfele" id="checkbox-label-2" />
                  <Checkbox labelText="Krīta tāfele" id="checkbox-label-3" />
                  <Checkbox labelText="Datori" id="checkbox-label-4" />
                  <Checkbox labelText="Projektors" id="checkbox-label-5" />
                </div>
              </SideNavItems>
            </SideNav>
          </Header>
        </>
      )}
    />
  );
};

export default HeaderBaseWActions;
