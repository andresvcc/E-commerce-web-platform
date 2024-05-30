import React from 'react'
import ReactHighlightSyntax from 'react-highlight-syntax';
import { UMLWrapper } from './UML';

type Params = {
  name: string;
  type: string;
  description: string;
}

type Args = {
  name: string,
  type: string,
  description: string
}

type Methods = {
  name: string;
  description: string;
  args: Args[];
}

type ClassStorieProps = {
  name: string;
  type: 'interface' | 'class';
  uml: string;
  params: Params[];
  methods: Methods[];
}

const style: { [key: string]: {[key: string]: string | number} } = {
  container:{
    width: '100%',
    marginRight: '25px',

  },
  table: { 
    width: '100%',
    borderCollapse: 'collapse',
    margin: '25px 0',
    fontSize: '0.9em',
    fontFamily: 'sans-serif',
    minWidth: '400px',
  },
  thead: {
    textAlign: 'center',
    border: '1px solid #dddddd'
  },
  tbody: {
    border: '1px solid #dddddd',
  },
  tr: {
    textAlign: 'left',
    borderBottom: '1px solid #dddddd',
  },
  th: {
    border: '1px solid #dddddd',
    padding: '12px 15px',
  },
  td: {
    border: '1px solid #dddddd',
    padding: '0px 0px',
  }
}

export function ClassStorie({ uml='', name='', type = 'class', params, methods }:ClassStorieProps) {
  return (
    <div style={style.container}>
      <UMLWrapper 
          justify="flex-start"
          width="auto"
          height="auto"
          model={`
            ${type} ${name}{
              ${params.map(({name, type})=> `+${name} : ${type}`).join('\n')}
              ${methods.map(({name})=> `+${name}()`).join('\n')}
            }
            ${uml}
          `}
      />
      {
        params.length > 0 ? (
          <table style={style.table}>
            <thead style={style.thead}>
              <tr style={style.tr}>
                <th style={style.th}>Params</th>
                <th style={style.th}>Description</th>
              </tr>
            </thead>
            <tbody style={style.tbody}>
              {
                params.map(({name, description, type}, key)=>(
                  <tr key={key} style={style.tr}>
                    <td style={{...style.td, width: '30%'}}>
                      <ReactHighlightSyntax 
                        style={{fontSize: '0.8rem'}}
                        language={'JavaScript'}
                        theme={'A11yLight'}
                        copy={false}
                        copyBtnTheme={'Light'}
                      >
                        {`${name}:${type}`}
                      </ReactHighlightSyntax>
                    </td>
                    <td style={{...style.td, width: '100%', padding: '10px 15px', color: '#333333', fontWeight: 100, fontSize: '0.9rem' }}>{description}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : ''
      }
      {
        methods.length > 0 ? (
           <table style={style.table}>
            <thead style={style.thead}>
              <tr style={style.tr}>
                <th style={style.th}>Method</th>
                <th style={style.th}>Arguments</th>
                <th style={style.th}>Description</th>
              </tr>
            </thead>
            <tbody style={style.tbody}>
              {
                methods.map(({name, description, args}, key)=>(
                  <tr key={key} style={style.tr}>
                    <td style={{...style.td, width: '30%'}}>
                      <ReactHighlightSyntax 
                          style={{fontSize: '0.8rem'}}
                          language={'TypeScript'}
                          theme={'Xcode'}
                          copy={false}
                          copyBtnTheme={'Light'}
                      >
                        {`${name}(${args.map(({name})=>`${name}`).join(', ')})`}
                      </ReactHighlightSyntax>
                    </td>
                    <td style={{...style.td, width: '30%'}}>
                      <ReactHighlightSyntax
                        style={{fontSize: '0.8rem'}}
                        language={'TypeScript'}
                        theme={'A11yLight'}
                        copy={false}
                        copyBtnTheme={'Light'}
                      >
                        {`${args.map(({name, type, description}, i)=> `${name}:${type}`).join('\n')}`}
                      </ReactHighlightSyntax>
                    </td>
                    <td style={{...style.td, width: '100%', padding: '10px 15px', color: '#333333', fontWeight: 100, fontSize: '0.9rem' }}>{description}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ): ''
      }
    </div>
  )
}
