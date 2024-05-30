import { ComponentStory, ComponentMeta } from '@storybook/react';
import { colors } from '../../Themes/MainTheme/theme.colors';

import { SearchBar } from './index';
import React from 'react';

export default {
  title: 'UI-components/SearchBar',
  component: SearchBar,
  parameters: {
    docs: {
      description: {
        component:
          'The SearchBar component displays a search input field with autocomplete functionality. It utilizes the Autocomplete component internally to provide suggestions to the user based on their input.',
      },
    },
  },
  argTypes: {
    suggestions: {
      description: 'An array of suggestions for the autocomplete feature.',
      defaultValue: [
        {
          id: 1,
          uuid: 'sample-uuid',
          name: 'Thymio II wireless',
          type: 'thymio-III',
          status: 'connecting',
        },
        {
          id: 2,
          uuid: 'sample-uuid',
          name: 'Thymio II de Andres',
          type: 'thymio-III',
          status: 'available',
        },
        {
          id: 4,
          uuid: 'sample-uuid',
          name: 'Thymio II wireless 3347',
          type: 'thymio-III',
          status: 'missed',
        },
        {
          id: 5,
          uuid: 'sample-uuid',
          name: 'Thymio III',
          type: 'thymio-III',
          status: 'occupied',
        },
      ],
      control: {
        type: null, // To hide the control from the Storybook panel
      },
    },
    AutocompleteKeys: {
      description: 'The key to use for autocompletion within the suggestions.',
      defaultValue: 'name',
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const ByType = Template.bind({});
ByType.args = {};
