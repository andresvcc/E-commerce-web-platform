import { ComponentStory, ComponentMeta } from '@storybook/react';
import { colors } from '../../Themes/MainTheme/theme.colors';

import { NavBar } from './index';
import React from 'react';

export default {
  title: 'UI-components/NavBar',
  component: NavBar,
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the component',
      table: { defaultValue: { summary: '' } },
    },
    bgcolor: {
      control: 'color',
      description: 'Background colour of the button.',
      defaultValue: colors.default.base.main,
      table: { defaultValue: { summary: colors.default.base.main } },
    },
    bgGradient: {
      control: 'color',
      description: 'When available, creates a gradient effect with the background colour of the button.',
      defaultValue: undefined,
      table: { defaultValue: { summary: 'undefined' } },
    },
    textcolor: {
      control: 'color',
      description: 'Colour of the text contained in the component.',
      defaultValue: colors.default.base.buttonText,
      table: { defaultValue: { summary: colors.default.base.buttonText } },
    },
    height: {
      control: 'text',
      defaultValue: 'auto',
      description: 'Affects the width of the button. support % px and vw',
      table: { defaultValue: { summary: 'auto' } },
    },
  },
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default NavBar',
};

export const Gradient = Template.bind({});
Gradient.args = {
  children: 'Gradient NavBar',
  bgcolor: '#ae37b4',
  bgGradient: '#c42121',
  textcolor: '#ffffff',
};
