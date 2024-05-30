import { ComponentStory, ComponentMeta } from '@storybook/react';
import { colors } from '../../Themes/MainTheme/theme.colors';

import { Typographie } from '.';
import React from 'react';

export default {
  title: 'UI-components/Typographie',
  component: Typographie,
  argTypes: {
    children: { control: false, description: 'The content of the component', table: { defaultValue: { summary: '' } } },
    color: {
      control: 'color',
      description: 'Colour of the text contained in the component',
      defaultValue: colors.default.base.text,
      table: { defaultValue: { summary: colors.default.base.text } },
    },
    colorGradient: {
      control: 'color',
      description: 'When available, creates a gradient effect with the colour of text',
      defaultValue: undefined,
      table: { defaultValue: { summary: 'undefined' } },
    },
    variant: {
      control: 'select',
      options: ['paragraph', 'title', 'subtitle'],
      description: 'determines the type of text, which alters the size and presentation.',
      defaultValue: 'paragraph',
      table: { defaultValue: { summary: 'paragraph' } },
    },
    size: {
      console: 'text',
      description: 'The size of the text',
      table: { defaultValue: { summary: '1rem' } },
    },
  },
} as ComponentMeta<typeof Typographie>;

const Template: ComponentStory<typeof Typographie> = (args) => <Typographie {...args} />;

const loremIpsum =
  "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.";

export const Paragraph = Template.bind({});
Paragraph.args = {
  children: loremIpsum,
  size: '1rem',
};

export const Title = Template.bind({});
Title.args = {
  children: 'Lorem Ipsum Title',
  variant: 'title',
  color: colors.default.base.text,
};

export const Subtitle = Template.bind({});
Subtitle.args = {
  children: 'Lorem Ipsum Subtitle',
  variant: 'subtitle',
  color: colors.default.base.text,
};

export const ParagraphGradient = Template.bind({});
ParagraphGradient.args = {
  children: loremIpsum,
  variant: 'paragraph',
  color: colors.primary.base.text,
  colorGradient: colors.secondary.base.text,
};

export const graphics = Template.bind({});
graphics.args = {
  children: 'Lorem Ipsum graphics',
  variant: 'graphics',
  color: colors.default.base.text,
  size: '3rem',
};
