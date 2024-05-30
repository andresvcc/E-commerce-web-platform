import React from 'react'
import ReactHighlightSyntax from 'react-highlight-syntax';

type Events = {
    name: string;
    payload: string;
    description: string;
}

type EventStorieProps = {
    events: Events[]
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

export function EventStorie({ events }:EventStorieProps) {
    return (
        <>
              {
                events.length > 0 ? (
                <table style={style.table}>
                    <thead style={style.thead}>
                    <tr style={style.tr}>
                        <th style={style.th}>Event Name</th>
                        <th style={style.th}>Payload</th>
                        <th style={style.th}>Description</th>
                    </tr>
                    </thead>
                    <tbody style={style.tbody}>
                    {
                        events.map(({name, description, payload}, key)=>(
                        <tr key={key} style={style.tr}>
                            <td style={{...style.td, width: '30%'}}>
                                <ReactHighlightSyntax 
                                    style={{fontSize: '0.8rem'}}
                                    language={'JavaScript'}
                                    theme={'A11yLight'}
                                    copy={false}
                                    copyBtnTheme={'Light'}
                                >
                                    {`${name}`}
                                </ReactHighlightSyntax>
                            </td>
                            <td style={{...style.td, width: '15%'}}>
                                <ReactHighlightSyntax 
                                    style={{fontSize: '0.8rem'}}
                                    language={'JavaScript'}
                                    theme={'A11yLight'}
                                    copy={false}
                                    copyBtnTheme={'Light'}
                                >
                                    {`${payload}`}
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
        </>
    )
}