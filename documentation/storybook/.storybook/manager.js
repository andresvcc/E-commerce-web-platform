import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import { create } from '@storybook/theming';

export const MainTheme = create({
    base: 'dark',
    brandTitle: 'Mobsya Documentation',
    brandUrl: 'https://www.thymio.org/',
    brandImage: 'https://www.thymio.org/wp-content/uploads/2021/12/Thymio-Mobsya_wht.png',
    brandTarget: '_self',
  });

addons.setConfig({
  theme: MainTheme,
});