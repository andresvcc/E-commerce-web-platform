import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import ResponsiveTable from './index';

export default {
  title: 'UI-components/ResponsiveTable',
  component: ResponsiveTable,
  argTypes: {
    columns: {
      control: 'object',
      description: 'The columns of the table',
    },
    rows: {
      control: 'object',
      description: 'The rows of the table',
    },
  },
} as ComponentMeta<typeof ResponsiveTable>;

const Template: ComponentStory<typeof ResponsiveTable> = (args) => <ResponsiveTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: [
    { header: 'Column 1', width: '40%' },
    { header: 'Column 2', width: '30%' },
    { header: 'Column 3', width: '30%' },
  ],
  rows: [
    {
      cells: [{ value: 'Data 1' }, { value: 'Data 2' }, { value: 'Data 3' }],
      collapseComponent: <div>This is a collapsed component</div>,
    },
    {
      cells: [{ value: 'Data 4' }, { value: 'Data 5' }, { value: 'Data 6' }],
      collapseComponent: <div>This is a collapsed component</div>,
    },
  ],
};
