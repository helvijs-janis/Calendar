/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {
  Calendar32, Group32, UserAvatar32, Settings32, Add16,
} from '@carbon/icons-react';
import { useState, React } from 'react';
import { useQuery } from 'react-query';
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

const HeaderBaseWActions = () => {
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

  // return (
  return items.isLoading ? (
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
          </Header>
        </>
      )}
    />
  );
};

export default HeaderBaseWActions;
