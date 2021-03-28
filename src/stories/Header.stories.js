import React from 'react';
import { HeaderBaseWActions } from '../components/Header';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Header',
  component: HeaderBaseWActions,
};

export const Text = () => <HeaderBaseWActions>Hello Header</HeaderBaseWActions>;

// const Template = (args) => <Header {...args} />;

// export const LoggedIn = Template.bind({});
// LoggedIn.args = {
//   user: {},
// };

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {};
