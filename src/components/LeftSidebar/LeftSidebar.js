import React from 'react';
import {
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    Button,
} from 'carbon-components-react';
import { Search20, Notification20, AppSwitcher20, Calendar32 } from '@carbon/icons-react';
import './LeftSidebar.css';

const LeftSidebar = () => {
    return (
        <SideNav
            isFixedNav
            expanded={true}
            isChildOfHeader={false}
            aria-label="Side navigation">
            <SideNavItems>
                <SideNavLink href="javascript:void(0)">
                    <b>LU</b>
                </SideNavLink>
                <SideNavLink href="javascript:void(0)">
                    <Calendar32 aria-label="Add" className="sidebar-icon" />
                </SideNavLink>
            </SideNavItems>
        </SideNav>
    )
}

export default LeftSidebar;
