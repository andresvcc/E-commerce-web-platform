import React, { FC, useState } from 'react';
import { DelayedContainer } from './DelayedContainer';
import { CollapsedRow, Data, Header, Table, Thead, Tr } from './table.styles';
import { TableProps } from './table.types';
import { useScreenSize } from './useScreenSize.hook';

const ResponsiveTable: FC<TableProps> = ({ columns, rows }) => {
  const [visibleRows, setVisibleRows] = useState(Array(rows.length).fill(false));
  const screenSize = useScreenSize();

  const toggleRowCollapse = (index: number) => {
    const newVisibleRows = [...visibleRows];
    newVisibleRows[index] = !newVisibleRows[index];
    setVisibleRows(newVisibleRows);
  };

  const smallScreens = ['xs', 'sm'];
  if (smallScreens.includes(screenSize)) {
    return <div>telefón</div>;
  }

  return (
    <Table>
      <Thead>
        <tr>
          {columns.map((column, index) => (
            <Header key={index} textAlign={column.align} width={column.width}>
              {column.header}
            </Header>
          ))}
        </tr>
      </Thead>
      <tbody key="tbodyTable">
        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <Tr key={`${rowIndex}-row`} onClick={() => row.collapseComponent && toggleRowCollapse(rowIndex)}>
              {row.cells.map((cell, cellIndex) => (
                <Data
                  key={cellIndex}
                  data-label={columns[cellIndex].header}
                  color={cell.color}
                  bgcolor={row.bgcolor}
                  textAlign={cell.align}
                >
                  {cell.value}
                </Data>
              ))}
            </Tr>
            {row.collapseComponent && (
              <CollapsedRow key={`${rowIndex}-collapsed`} theme={{ visible: visibleRows[rowIndex], height: 80 }}>
                {visibleRows[rowIndex] ? (
                  <DelayedContainer delay={0.5} colSpan={columns.length}>
                    {row.collapseComponent}
                  </DelayedContainer>
                ) : null}
              </CollapsedRow>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default ResponsiveTable;
