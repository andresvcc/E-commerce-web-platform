import { ComponentStory, ComponentMeta } from '@storybook/react';
import { colors } from '../../Themes/MainTheme/theme.colors';

import { ButtonPlay } from './index';
import React from 'react';

export default {
  title: 'UI-components/ButtonPlay',
  component: ButtonPlay,
  argTypes: {
    isRunning: {
      control: 'boolean',
      description: 'The content of the component',
      table: { defaultValue: { summary: false } },
    },
    bgcolor: {
      control: 'color',
      description: 'Background colour of the ButtonPlay.',
      defaultValue: colors.default.base.main,
      table: { defaultValue: { summary: colors.default.base.main } },
    },
    bgGradient: {
      control: 'color',
      description: 'When available, creates a gradient effect with the background colour of the ButtonPlay.',
      defaultValue: undefined,
      table: { defaultValue: { summary: 'undefined' } },
    },
    textcolor: {
      control: 'color',
      description: 'Colour of the text contained in the component.',
      defaultValue: colors.default.base.buttonText,
      table: { defaultValue: { summary: colors.default.base.buttonText } },
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
} as ComponentMeta<typeof ButtonPlay>;

const Template: ComponentStory<typeof ButtonPlay> = (args) => {
  const [isPlay, setIsPlay] = React.useState(false);
  return <ButtonPlay {...args} isPlay={isPlay} onClick={() => setIsPlay(!isPlay)} />;
};

export const Default = Template.bind({});
Default.args = {
  isPlay: true,
  textcolor: '#ffffff',
};
