/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
// MonacoEditorComponent.tsx

import React, { useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

interface ErrorMarker {
  line: number;
  message: string;
}

interface MonacoEditorProps {
  code: string;
  errors?: ErrorMarker[];
}

export const CodeEditor: React.FC<MonacoEditorProps> = ({ code, errors = [] }) => {
  const monaco = useMonaco();

  // Configure autocompletion
  React.useEffect(() => {
    if (!monaco) {
      return;
    }

    monaco.languages.registerCompletionItemProvider('python', {
      provideCompletionItems: (model: { getWordUntilPosition: (arg0: any) => any; }, position: { lineNumber: any; }) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        };

        const controlStructures = [
          { label: 'for', snippet: 'for ${1:variable} in ${2:iterable}:\n\t${0}' },
          { label: 'while', snippet: 'while ${1:condition}:\n\t${0}' },
          { label: 'if', snippet: 'if ${1:condition}:\n\t${0}' },
          { label: 'else', snippet: 'else:\n\t${0}' },
          { label: 'elif', snippet: 'elif ${1:condition}:\n\t${0}' },
          // ... puedes agregar más estructuras aquí
        ];

        const suggestions = controlStructures.map((item) => ({
          label: item.label,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: item.snippet,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
        }));

        if (word.word.startsWith('test')) {
          suggestions.push(
            {
              label: 'testFunction',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'testFunction',
              range: range,
              insertTextRules: undefined,
            },
            {
              label: 'testVariable',
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: 'testVariable',
              range: range,
              insertTextRules: undefined,
            },
            // ... puedes agregar más palabras aquí
          );
        }

        return { suggestions };
      },
    });
  }, [monaco]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    // Mark errors
    if (errors && errors.length) {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelMarkers(
          model,
          'owner',
          errors.map((error) => ({
            startLineNumber: error.line,
            startColumn: 1,
            endLineNumber: error.line,
            endColumn: model.getLineMaxColumn(error.line),
            severity: monaco.MarkerSeverity.Error,
            message: error.message,
          })),
        );
      }
    }
  };

  useEffect(() => {
    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    styleSheet.insertRule(`
      .overflowingContentWidgets {
        position: fixed !important;
        top: 7.7rem !important;
        width: 100% !important;
      }
    `, styleSheet.cssRules.length);
  }, []);

  return (
    <Editor
      className="monaco-editor"
      defaultLanguage="python"
      defaultValue={code}
      onMount={handleEditorDidMount}
      options={{
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
      }}
    />
  );
};
