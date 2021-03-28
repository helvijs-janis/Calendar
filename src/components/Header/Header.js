import React from 'react';
import { Search20, Notification20, AppSwitcher20, Calendar32, Group32, UserAvatar32, Settings32 } from '@carbon/icons-react';
import { action } from '@storybook/addon-actions';
import {
    Content,
    Header,
    HeaderMenuButton,
    HeaderName,
    HeaderNavigation,
    HeaderMenu,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
    HeaderSideNavItems,
    SkipToContent,
    SideNav,
    // Temporarily comment these out until they are needed again
    // SideNavHeader,
    // SideNavDetails,
    // SideNavSwitcher,
    SideNavDivider,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    Switcher,
    SwitcherItem,
    SwitcherDivider,
  } from 'carbon-components-react/lib/components/UIShell';

const HeaderBaseWActions = () => {
    return (
        <Header aria-label="LU" HeaderNavigation="left">
        <HeaderName href="#" prefix="">
          LU
        </HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem href="#"><Calendar32 /></HeaderMenuItem>
          <HeaderMenuItem href="#"><Group32 /></HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Search" onClick={action('search click')}>
            <Settings32 />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="Notifications"
            onClick={action('notification click')}
            tooltipAlignment="end">
            <UserAvatar32 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    )
}

export default HeaderBaseWActions;