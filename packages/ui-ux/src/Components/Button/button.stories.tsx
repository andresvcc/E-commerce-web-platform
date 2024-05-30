import { ComponentStory, ComponentMeta } from '@storybook/react';
import { colors } from '../../Themes/MainTheme/theme.colors';

import { Button } from './index';
import React from 'react';

export default {
  title: 'UI-components/Button',
  component: Button,
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
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
      description: 'Determines the type of button.',
      defaultValue: 'contained',
      table: { defaultValue: { summary: 'outlined' } },
    },
    width: {
      control: 'text',
      defaultValue: '100%',
      description: 'Affects the width of the button. support % px and vw',
      table: { defaultValue: { summary: '100%' } },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      defaultValue: false,
      table: { defaultValue: { summary: false } },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Button Title',
};

export const Gradient = Template.bind({});
Gradient.args = {
  children: 'Gradient Button Title',
  variant: 'contained',
  bgGradient: colors.secondary.light.main,
  bgcolor: colors.default.dark.main,
  textcolor: colors.primary.base.buttonText,
};

export const Outlined = Template.bind({});
Outlined.args = {
  children: 'Outlined Button Title',
  variant: 'outlined',
  bgcolor: colors.primary.base.main,
  textcolor: colors.primary.base.buttonText,
};

export const GradientOutlined = Template.bind({});
GradientOutlined.args = {
  children: 'Gradient Outlined Button Title',
  variant: 'outlined',
  bgGradient: colors.secondary.base.main,
  bgcolor: colors.primary.base.main,
  textcolor: colors.primary.base.buttonText,
};

export const Text = Template.bind({});
Text.args = {
  children: 'Default Button Title',
  variant: 'text',
  bgcolor: colors.primary.base.main,
  textcolor: colors.primary.base.buttonText,
};

export const TextGradient = Template.bind({});
TextGradient.args = {
  children: 'Text Gradient Button Title',
  variant: 'text',
  bgGradient: colors.secondary.base.main,
  bgcolor: colors.primary.base.main,
  textcolor: colors.primary.base.buttonText,
};
