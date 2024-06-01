const path = require('path')

module.exports = {
  stories: [
    '../**/*.stories.mdx',
    '../**/*.stories.md',
    '../**/*.stories.@(js|jsx|ts|tsx)',
    '../../../backend/**/*.stories.mdx',
    '../../../backend/**/*.stories.md',
    '../../../backend/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../apps/**/*.stories.mdx',
    '../../../apps/**/*.stories.md',
    '../../../apps/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/**/*.stories.mdx',
    '../../../packages/**/*.stories.md',
    '../../../packages/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../documentation/documents/**/*.stories.mdx',
    '../../../documentation/documents/**/*.stories.md',
    '../../../documentation/documents/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  core: {
    builder: 'webpack5'
  },
  typescript: { reactDocgen: false }
}
