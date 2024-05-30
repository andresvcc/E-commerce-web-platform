import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Icon, iconsList } from './index';
import React from 'react';

export default {
  title: 'UI-components/Icons',
  component: Icon,
  argTypes: {
    bgcolor: {
      control: 'color',
      description: 'Background Colour of the icon',
      defaultValue: undefined,
      table: { defaultValue: { summary: 'undefined' } },
    },
    bgRound: {
      control: 'boolean',
      description: 'Background round of the icon',
      defaultValue: false,
      table: { defaultValue: { summary: 'false' } },
    },
    palleteFill: {
      control: 'object',
      description: 'Array of colours used as filler for the icon',
      table: { defaultValue: { summary: '[]' } },
    },
    palleteFillHover: {
      control: 'object',
      description: 'Array of colours used as filler for the icon in hover state',
      defaultValue: ['#0F0F0F'],
      table: { defaultValue: { summary: '[]' } },
    },
    name: {
      control: 'select',
      options: iconsList,
      description: 'The name of icon',
      defaultValue: '',
      table: { defaultValue: { summary: '' } },
    },
    sizeW: {
      control: { type: 'range', min: 0, max: 400, step: 1 },
      defaultValue: 100,
      description: 'Affects the width size of the icon.',
      table: { defaultValue: { summary: 100 } },
    },
    sizeH: {
      control: { type: 'range', min: 0, max: 400, step: 1 },
      defaultValue: 100,
      description: 'Affects the height size of the icon.',
      table: { defaultValue: { summary: 100 } },
    },
    rotate: {
      control: { type: 'range', min: 0, max: 360, step: 1 },
      defaultValue: 0,
      description: 'Affects the rotate params of the icon.',
      table: { defaultValue: { summary: 0 } },
    },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'logoThymioByMobsya',
  bgcolor: undefined,
  palleteFill: ['#452AB6', '#F57715'],
  palleteFillHover: ['#ababab', '#ababab'],
  sizeH: 150,
  sizeW: 400,
};

export const Thymio = Template.bind({});
Thymio.args = {
  name: 'thymio',
  bgcolor: undefined,
  palleteFill: ['#0F0F0F', '#EAEAEA', '#CECECE'],
  palleteFillHover: ['#FF0000', '#EAEAEA', '#CECECE'],
};

export const Simulator = Template.bind({});
Simulator.args = {
  name: 'simulator',
  bgcolor: undefined,
  palleteFill: ['#0F0F0F'],
  palleteFillHover: ['#ababab'],
};

export const Help = Template.bind({});
Help.args = {
  name: 'help',
  bgcolor: undefined,
  palleteFill: ['#0A9EEB'],
  palleteFillHover: ['#ababab'],
};

export const Close = Template.bind({});
Close.args = {
  name: 'close',
  bgcolor: undefined,
  palleteFill: ['#0A9EEB'],
  palleteFillHover: ['#ababab'],
};

export const Alert = Template.bind({});
Alert.args = {
  name: 'alert',
  bgcolor: undefined,
  palleteFill: ['#a80b0b'],
  palleteFillHover: ['#ababab'],
};

export const Info = Template.bind({});
Info.args = {
  name: 'info',
  bgcolor: undefined,
  palleteFill: ['#ff9a29'],
  palleteFillHover: ['#ababab'],
};

export const Wifi = Template.bind({});
Wifi.args = {
  name: 'wifi',
  bgcolor: undefined,
  palleteFill: ['#000000'],
  palleteFillHover: ['#ababab'],
};

export const Bluetooth = Template.bind({});
Bluetooth.args = {
  name: 'bluetooth',
  bgcolor: undefined,
  palleteFill: ['#000000'],
  palleteFillHover: ['#ababab'],
};

export const Usb = Template.bind({});
Usb.args = {
  name: 'usb',
  bgcolor: undefined,
  palleteFill: ['#000000'],
  palleteFillHover: ['#ababab'],
};

export const All = Template.bind({});
All.args = {
  name: 'all',
  bgcolor: undefined,
  palleteFill: ['#000000'],
  palleteFillHover: ['#ababab'],
};

export const Dongle = Template.bind({});
Dongle.args = {
  name: 'dongle',
  bgcolor: undefined,
  palleteFill: ['#000000'],
  palleteFillHover: ['#ababab'],
};

export const Search = Template.bind({});
Search.args = {
  name: 'search',
  bgcolor: undefined,
  palleteFill: ['#000000'],
  palleteFillHover: ['#ababab'],
};
export const Filter = Template.bind({});
Filter.args = {
  name: 'filter',
  bgcolor: undefined,
  palleteFill: ['#000000'],
  palleteFillHover: ['#ababab'],
};

export const Play = Template.bind({});
Play.args = {
  name: 'play',
  bgcolor: undefined,
  palleteFill: ['#000000'],
  palleteFillHover: ['#ababab'],
};

export const Advanced = Template.bind({});
Advanced.args = {
  name: 'advanced',
  bgcolor: undefined,
  palleteFill: ['#32BEA6', '#4B4F54'],
  palleteFillHover: ['#32CEA6', '#4F4F54'],
};

export const Stop = Template.bind({});
Stop.args = {
  name: 'stop',
  bgcolor: undefined,
  palleteFill: ['#000000'],
  palleteFillHover: ['#ababab'],
};

export const Add = Template.bind({});
Add.args = {
  name: 'add',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Bell = Template.bind({});
Bell.args = {
  name: 'bell',
  bgcolor: undefined,
  palleteFill: ['#92929D', '#E61F57'],
  palleteFillHover: ['#ababab', '#FF1F87'],
};

export const Arrow = Template.bind({});
Arrow.args = {
  name: 'arrow',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
  rotate: 270,
};

export const Arrow2 = Template.bind({});
Arrow2.args = {
  name: 'arrow2',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
  rotate: 270,
};

export const Bug = Template.bind({});
Bug.args = {
  name: 'bug',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Cloud = Template.bind({});
Cloud.args = {
  name: 'cloud',
  bgcolor: undefined,
  palleteFill: ['#4B4F54', '#FFFFFF'],
  palleteFillHover: ['#ababab', '#ababab'],
};

export const Copy = Template.bind({});
Copy.args = {
  name: 'copy',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Cut = Template.bind({});
Cut.args = {
  name: 'cut',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Dashboard = Template.bind({});
Dashboard.args = {
  name: 'dashboard',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Menu = Template.bind({});
Menu.args = {
  name: 'menu',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Paste = Template.bind({});
Paste.args = {
  name: 'paste',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Save = Template.bind({});
Save.args = {
  name: 'save',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Undo = Template.bind({});
Undo.args = {
  name: 'undo',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Rendo = Template.bind({});
Rendo.args = {
  name: 'rendo',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Favorite = Template.bind({});
Favorite.args = {
  name: 'favorite',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Share = Template.bind({});
Share.args = {
  name: 'share',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const VPL = Template.bind({});
VPL.args = {
  name: 'vpl',
  bgcolor: undefined,
  palleteFill: ['#518AF2', '#E46145'],
  palleteFillHover: ['#ababab', '#ababab'],
};

export const Python = Template.bind({});
Python.args = {
  name: 'python',
  bgcolor: undefined,
  palleteFill: ['#387EB8', '#FFC331'],
  palleteFillHover: ['#ababab', '#ababab'],
};

export const Scratch = Template.bind({});
Scratch.args = {
  name: 'scratch',
  bgcolor: undefined,
  palleteFill: ['#FAA51D'],
  palleteFillHover: ['#ababab', '#ababab'],
};

export const Mango = Template.bind({});
Mango.args = {
  name: 'mango',
  bgcolor: undefined,
  palleteFill: ['#452AB6', '#fb8500', '#fb8500', '#fb8500', '#fb8500'],
  palleteFillHover: ['#ababab', '#ababab', '#ababab', '#ababab', '#ababab'],
};

export const ThymioLeftSide = Template.bind({});
ThymioLeftSide.args = {
  name: 'thymioLeftSide',
  bgcolor: undefined,
};

export const ShowPassword = Template.bind({});
ShowPassword.args = {
  name: 'showPassword',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Broadcast = Template.bind({});
Broadcast.args = {
  name: 'broadcast',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Wireless = Template.bind({});
Wireless.args = {
  name: 'wireless',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};

export const Internet = Template.bind({});
Internet.args = {
  name: 'internet',
  bgcolor: undefined,
  palleteFill: ['#4B4F54'],
  palleteFillHover: ['#ababab'],
};
