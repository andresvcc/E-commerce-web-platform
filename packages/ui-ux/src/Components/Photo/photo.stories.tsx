import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Photo } from './index';
import React from 'react';

export default {
  title: 'UI-components/Photo',
  component: Photo,
  parameters: {
    docs: {
      description: {
        component:
          'The Photo component is a container for an image resource, it can support different formats like jpg, png. and can be customized with different hover effects and sizes.',
      },
    },
  },
  argTypes: {
    alt: {
      control: 'text',
      description: 'Specifies an alternate text for an photo.',
      table: { defaultValue: { summary: '' } },
    },
    hoverEffect: {
      control: 'select',
      options: ['none', 'opacity'],
      description: 'The hover effect',
      defaultValue: 'none',
      table: { defaultValue: { summary: 'none' } },
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain'],
      description: 'Specify how an photo should be resized to fit its container',
      defaultValue: 'contain',
      table: { defaultValue: { summary: 'contain' } },
    },
    bgcolor: {
      control: 'color',
      description: 'Background colour of the photo.',
      defaultValue: undefined,
      table: { defaultValue: { summary: 'undefined' } },
    },
    width: {
      control: 'text',
      defaultValue: '100%',
      description: 'Affects the width of the photo. support units of measurement % px and vw.',
      table: { defaultValue: { summary: '100%' } },
    },
    heigth: {
      control: 'text',
      defaultValue: '100px',
      description: 'Affects the heigth of the photo. support units of measurement px and vh.',
      table: { defaultValue: { summary: '100px' } },
    },
    paddingX: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: "create space around an element's content, inside of left and right borders",
      defaultValue: 0,
      table: { defaultValue: { summary: 0 } },
    },
    paddingY: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: "create space around an element's content, inside of top and bottom borders",
      defaultValue: 0,
      table: { defaultValue: { summary: 0 } },
    },
  },
} as ComponentMeta<typeof Photo>;

const Template: ComponentStory<typeof Photo> = (args) => <Photo {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'logo-mobsya',
};

export const UsingVPL3 = Template.bind({});
UsingVPL3.args = {
  src: 'using-vpl3',
  hoverEffect: 'none',
  width: '100%',
  objectFit: 'cover',
  paddingX: 0,
  paddingY: 0,
};

export const UsingScratch = Template.bind({});
UsingScratch.args = {
  src: 'using-scratch',
  hoverEffect: 'none',
  width: '100%',
  objectFit: 'cover',
  paddingX: 0,
  paddingY: 0,
};

export const UsingStudio = Template.bind({});
UsingStudio.args = {
  src: 'using-studio',
  hoverEffect: 'none',
  width: '100%',
  objectFit: 'cover',
  paddingX: 0,
  paddingY: 0,
};

export const usingVpl = Template.bind({});
usingVpl.args = {
  src: 'using-vpl',
  hoverEffect: 'none',
  width: '100%',
  objectFit: 'cover',
  paddingX: 0,
  paddingY: 0,
};

export const usingThonny = Template.bind({});
usingThonny.args = {
  src: 'using-thonny',
  hoverEffect: 'none',
  width: '100%',
  objectFit: 'cover',
  paddingX: 0,
  paddingY: 0,
};
