import {
  Calendar32,
  Group32,
  UserAvatar32,
  Settings32,
} from "@carbon/icons-react";
import { React } from "react";
import {
  Header,
  HeaderName,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderContainer,
} from "carbon-components-react/lib/components/UIShell";

const HeaderBaseWActions = () => (
  <HeaderContainer
    render={() => (
      <>
        <Header aria-label="LU">
          <HeaderName href="#" prefix="">
            LU
          </HeaderName>
          <HeaderMenuItem href="#">
            <Calendar32 />
          </HeaderMenuItem>
          <HeaderMenuItem href="#">
            <Group32 />
          </HeaderMenuItem>
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
