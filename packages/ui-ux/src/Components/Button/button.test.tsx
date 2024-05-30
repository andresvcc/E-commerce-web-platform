import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import { Button } from './index';

afterEach(cleanup); // Limpia después de cada prueba

describe('tests Button component', () => {
  test('test props children string', () => {
    const { getByText } = render(<Button>Title</Button>);
    expect(getByText('Title')).toBeTruthy();
  });

  test('test props children reactNode', () => {
    const { getByText } = render(
      <Button>
        <p>Title</p>
      </Button>,
    );
    expect(getByText('Title')).toBeTruthy();
  });

  test('test props onClick', () => {
    let count = 0;
    const { getByRole } = render(<Button onClick={() => count++}>Title</Button>);
    const button = getByRole('button');

    button.click();
    expect(count === 1).toBe(true);
  });
});
