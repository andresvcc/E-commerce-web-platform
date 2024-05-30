import '../styles/globals.css'
import { addParameters } from '@storybook/react';
import * as NextImage from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
}

addParameters({
  docs: {
    components: {
      code: ({children, ...props}) => {
        return <SyntaxHighlighter language="python" {...props}>{children}</SyntaxHighlighter>;
      },
    },
  },
});



