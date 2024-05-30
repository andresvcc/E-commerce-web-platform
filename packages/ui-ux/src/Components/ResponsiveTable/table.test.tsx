import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { describe, expect, test } from '@jest/globals';
import ResponsiveTable from './index';

describe('ResponsiveTable', () => {
  const columns = [{ header: 'Column 1' }, { header: 'Column 2' }, { header: 'Column 3' }];

  const rows = [
    {
      cells: [{ value: 'Row 1 - Cell 1' }, { value: 'Row 1 - Cell 2' }, { value: 'Row 1 - Cell 3' }],
      bgcolor: '#ffffff',
      collapseComponent: <div>Collapsible content</div>,
    },
    {
      cells: [{ value: 'Row 2 - Cell 1' }, { value: 'Row 2 - Cell 2' }, { value: 'Row 2 - Cell 3' }],
      bgcolor: '#f0f0f0',
      collapseComponent: <div>Collapsible content</div>,
    },
  ];

  test('renders the table with correct columns and rows', () => {
    const component = renderer.create(<ResponsiveTable columns={columns} rows={rows} />);
    const tree = component.root;

    const TreeColumns = tree.findByType('thead').findAllByType('th');
    const TreeRows = tree.findByType('tbody');

    // Verify that the column headers are rendered
    columns.forEach((column, index) => {
      expect(TreeColumns[index].props.children).toContain(column.header);
    });

    // Verify that the cell values are rendered
    rows.forEach((row, rowIndex) => {
      if (rowIndex % 2 === 0 || rowIndex === 0) {
        const rowComponents = TreeRows.findAllByType('tr')[rowIndex];
        row.cells.forEach((cell, cellIndex) => {
          const cellComponent = rowComponents.findAllByType('td')[cellIndex].children.toString();
          expect(cellComponent).toContain(cell.value);
        });
      }
    });
  });
});
