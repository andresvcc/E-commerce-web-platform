import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Spinner, SpinnersList } from './index';
import React from 'react';

export default {
  title: 'UI-components/Spinners',
  component: Spinner,
  argTypes: {
    color: {
      control: 'color',
      description: 'Colour of the Spinner',
      defaultValue: '#000',
      table: { defaultValue: { summary: '#000' } },
    },
    name: {
      control: 'select',
      options: SpinnersList,
      description: 'The name of Spinner',
      defaultValue: '',
      table: { defaultValue: { summary: '' } },
    },
    size: {
      control: { type: 'range', min: 0, max: 200, step: 1 },
      defaultValue: 50,
      description: 'Affects the size of the Spinner.',
      table: { defaultValue: { summary: 50 } },
    },
    speed: {
      control: { type: 'range', min: 0, max: 200, step: 1 },
      defaultValue: 100,
      description: 'Affects the speed of the Spinner.',
      table: { defaultValue: { summary: 100 } },
    },
  },
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'dual-ring',
};
