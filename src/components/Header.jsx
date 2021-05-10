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
import { fetchBuildings } from '../queries/RoomQueries';

const HeaderBaseWActions = () => (
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

export default HeaderBaseWActions;
