/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ReactHighlightSyntax, { Language } from 'react-highlight-syntax';

type EventStorieProps = {
  children: string;
  language?: Language;
};

export function CodeStorie({ children, language = 'TypeScript' }: EventStorieProps) {
  return (
    <>
      <pre>
        <ReactHighlightSyntax
          style={{ fontSize: '0.8rem' }}
          language={language}
          theme="A11yDark"
          copy={false}
          copyBtnTheme={'Dark'}
        >
          {`\n${children.toString()}\n`}
        </ReactHighlightSyntax>
      </pre>
    </>
  );
}
