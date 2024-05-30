import { ComponentStory, ComponentMeta } from '@storybook/react';
import { colors } from '../../Themes/MainTheme/theme.colors';

import { Autocomplete } from './index';
import React from 'react';

export default {
  title: 'UI-components/Autocomplete',
  component: Autocomplete,
  parameters: {
    docs: {
      description: {
        component:
          "The Autocomplete component is a user-friendly UI utility that suggests possible options to the user as they begin typing into an input field. It's flexible and customizable, accepting an array of objects for suggestions and an array of keys for filtering within the suggestion objects.",
      },
    },
  },
  argTypes: {
    suggestions: {
      description:
        'An array of objects to serve as suggestions for the Autocomplete component. Each suggestion should be an object with key-value pairs that can be string or number.',

      defaultValue: [],
      control: 'object',
      table: { defaultValue: { summary: '[]' } },
    },
    AutocompleteKeys: {
      description:
        'An array of keys that will be used to search within the suggestion objects. These should be the keys of the properties you want to include in the search.',

      defaultValue: ['name'],
      control: 'array',
      table: { defaultValue: { summary: '[]' } },
    },
  },
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = (args) => <Autocomplete {...args} />;

const suggestions = [
  {
    id: 'sample-uuid',
    name: 'Thymio II wireless',
    type: 'thymio-III',
    status: 'connecting',
  },
  {
    id: 'sample-uuid',
    name: 'Thymio II de Andres',
    type: 'thymio-III',
    status: 'available',
  },
  {
    id: 'sample-uuid',
    name: 'Thymio II wireless 3347',
    type: 'thymio-III',
    status: 'missed',
  },
  {
    id: 'sample-uuid',
    name: 'Thymio III',
    type: 'thymio-III',
    status: 'occupied',
  },
];

export const Default = Template.bind({});
Default.args = {
  suggestions,
  AutocompleteKey: 'name',
};
